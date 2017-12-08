// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase = require('firebase')
require('firebase/firestore')
const axios = require('axios')

let closest = {
	distance: 100000,
	bus: {routeId: 'none'}
}

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// calculate if a user is close enough
function isValid(userPoint, busPoint) {
	const latDistance = Math.abs(userPoint.latitude - busPoint.lat)
	const lonDistance = Math.abs(userPoint.longitude - busPoint.lon)
	const distance = Math.sqrt(Math.pow(latDistance, 2) + Math.pow(lonDistance, 2))
	if (distance <= 0.00220) {
		return true
	}
	// for testing purposes, display the closest bus
	if (distance < closest.distance) {
		closest.distance = distance
		closest.bus = busPoint
	}
	return false
}

// Right now, we are awarding 0.1 jouls for every 10 seconds spent on a bus
function calculateJouls(totalPoints) {
	return totalPoints / 10.0
}

function addJoulsToWallet(userRef, jouls) {
	userRef.get().then((userDoc) => {
		const userData = userDoc.data()
		const currentJouls = userData.wallet
		const newJouls = currentJouls + jouls
		userRef.update({
			wallet: newJouls
		}).then(console.log('successfully updated user wallet'))
			.catch((error) => console.error('error updating wallet', error))
	}).catch((error => console.error('error accessing user', error)))
}

function updateEventValidation(eventRef, validTrip, jouls) {
	eventRef.update({
		jouls,
		validation: validTrip
	}).then(
		console.log('Verified trip with status', validTrip)
	).catch((error) => {
		console.error('Error updating event', error)
	})
}

// Award jouls and signify a valid trip
function updateUserData(eventRef, userRef, validTrip, pathLength) {
	let awardedJouls = 0
	// only award jouls and update wallet if approved
	if (validTrip === 'approved') {
		awardedJouls = calculateJouls(pathLength)
		addJoulsToWallet(userRef, awardedJouls)
	}
	updateEventValidation(eventRef, validTrip, awardedJouls)
}

// Looks through the whole path and determine if it is valid
function readPath(pathRef) {
	let total = 0.0
	let valid = 0.0
	pathRef.get().then(
		(querySnapshot) => {
			querySnapshot.forEach( (point) => {
				const pointData = point.data()
				if (!pointData.end) {
					total += 1.0
					if (pointData.valid === true) {
						valid += 1.0
					}
				}
			})

			// Allow for a 75% approval rate
			let validTrip = 'disapproved'
			const validRatio = valid / total
			if (validRatio >= 0.65) {
				validTrip = 'approved'
			}

			// retrieve user data for updating
			const eventRef = pathRef.parent
			const userRef = eventRef.parent.parent
			updateUserData(eventRef, userRef, validTrip, total)
			console.log('event has valid ratio:', validRatio)
		}
	).catch((error) => {
		console.error('error validating trip', error)
	})
}

// Validates a point in the geopath of the user's trip
exports.validateTrip = functions.firestore
	.document('users/{userId}/events/{eventId}/path/{pointId}')
	.onCreate(point => {
		const userPoint = point.data.data();

		// for testing purposes, we want to display the user's closest bus
		const userRef = point.data.ref.parent.parent.parent.parent

		// If the trip has ended, review all the points for submission
		if (userPoint.end) {
			const pathRef = point.data.ref.parent
			readPath(pathRef)
			return
		}

		let validStatus = false
		// Retrieve all of the current bus coordinates and check if any are close to the user
		axios.get('http://restbus.info/api/agencies/actransit/vehicles')
			.then((response) => {
				response.data.forEach((busPoint) => {
					if (isValid(userPoint, busPoint, userRef)) {
						validStatus = true
					}
				})

				//update the user's closest bus for testing
				userRef.update({
					closestBus: closest
				}).then(() => {
					console.log('updated closest bus', closest)
					closest.distance = 100000;
					closest.bus = {routeId: 'none'} }).catch((error) => 'error updating closest')


				const pointRef = point.data.ref
					pointRef.update({
						valid: validStatus
					}).then(
						console.log('sucessfully updated', pointRef)
					).catch(function (error) {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					})
			}).catch((error) => {
			console.error("Error fetching transit data", error)
		})
	})

function createExchangeEvents(buyerRef, sellerRef, price) {
	const buyerEventsRef = buyerRef.collection('events')
	const sellerEventsRef = sellerRef.collection('events')
	const time = new Date()

	//Update buyer's events
	sellerRef.get().then( (doc) => {
		const sellerUser = doc.data().username
		buyerEventsRef.add({
			type: `purchase from ${sellerUser}`,
			time,
			validation: 'approved',
			jouls: -1*price,
			sellerRef: sellerRef
		}).then(console.log('updated user purchase')).catch((error) => console.error('error updating event', error))
	}).catch((error) => console.error('error accessing seller', error))

	//Update seller's events
	buyerRef.get().then( (doc) => {
		const buyerUser = doc.data().username
		sellerEventsRef.add({
			type: `sale to ${buyerUser}`,
			time,
			validation: 'approved',
			jouls: price,
			buyerRef: buyerRef
		}).then(console.log('updated seller sale')).catch((error) => console.error('error updating event', error))
	}).catch((error) => console.error('error accessing buyer', error))
}

// Validates a purchase made by the buyer
exports.purchaseItem = functions.firestore
	.document('market/{itemId}/buyers/{buyerId}')
	.onCreate(buyer => {
		const buyerRef = buyer.data.data().buyerRef
		const itemRef = buyer.data.ref.parent.parent

		// get the sellerReference and price
		itemRef.get().then( (doc) => {
			const itemData = doc.data()
			const sellerRef = itemData.user
			const price = itemData.price
			buyerRef.get().then((doc) => {

				// Check if the buyer has enough funds
				const buyerWallet = doc.data().wallet
				if (buyerWallet < price) {
					console.log('buyer does not have sufficient funds')
					return
				}

				// make the joul exchange
				addJoulsToWallet(sellerRef, price)
				addJoulsToWallet(buyerRef, -1*price)

				// make the item unavailable on the market
				itemRef.update({
					available: false
				}).then(
					createExchangeEvents(buyerRef, sellerRef, price)
				)
					.catch((error) => console.error('error updating item', error))
			}).catch((error) => console.error('error accessing buyer', error))
		}).catch((error) => console.error('error accessing item', error))
	})

// Validates a direct exchange of jouls
exports.exchangeJouls = functions.firestore
	.document('users/{userId}/payments/{paymentId}')
	.onCreate(payment => {
		const paymentData = payment.data.data()
		const payerRef = paymentData.payerRef

		// get the receiverReference and amount
		const receiverRef = paymentData.receiverRef
		const amount = paymentData.amount
		payerRef.get().then((doc) => {

			// Check if the buyer has enough funds
			const buyerWallet = doc.data().wallet
			if (buyerWallet < amount) {
				console.log('buyer does not have sufficient funds')
				return
			}

			// make the joul exchange
			addJoulsToWallet(receiverRef, amount)
			addJoulsToWallet(payerRef, -1*amount)

			// make the item unavailable on the market
			createExchangeEvents(payerRef, receiverRef, amount)
		}).catch((error) => console.error('error accessing buyer', error))
	})
