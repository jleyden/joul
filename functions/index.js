// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase = require('firebase')
require('firebase/firestore')
const axios = require('axios')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// calculate if a user is close enough
function isValid(userPoint, busPoint) {
	const latDistance = Math.abs(userPoint.latitude - busPoint.lat)
	const lonDistance = Math.abs(userPoint.longitude - busPoint.lon)
	const distance = Math.sqrt(Math.pow(latDistance, 2) + Math.pow(lonDistance, 2))
	if (distance <= 0.001) {
		return true
	}
	return false
}

// Right now, we are awarding 0.1 jouls for every 10 seconds spent on a bus
function calculateJouls(totalPoints) {
	return totalPoints / 10.0
}

function updateUserWallet(userRef, jouls) {
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
		updateUserWallet(userRef, awardedJouls)
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
					console.log(point)
					console.log(point.data().valid)
					if (point.data().valid === true) {
						valid += 1.0
					}
				}
			})

			// Allow for a 75% approval rate
			let validTrip = 'disapproved'
			const validRatio = valid / total
			if (validRatio >= 0.75) {
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
					if (isValid(userPoint, busPoint)) {
						validStatus = true
					}
				})
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
