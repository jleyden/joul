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
	if (latDistance <= 0.00001 && lonDistance <= 0.00001) {
		return true
	}
	return false
}

exports.validateTrip = functions.firestore
	.document('users/{userId}/events/{eventId}')
	.onWrite(event => {
		// Request
		const eventData = event.data.data();
		let path = eventData.path
		if (path.length === 0) {
			return
		}
		const lastPoint = path[path.length - 1]
		let validStatus = false
		// Retrieve all of the current bus coordinates and check if any are close to the user
		axios.get('http://restbus.info/api/agencies/actransit/vehicles')
			.then((response) => {response.data.forEach((point) => {
				if(isValid(lastPoint, point)) {
					validStatus = true
				}
			})
		const eventRef = event.data.ref
		let newValid
		if (eventData.validPath) {
			newValid = eventData.validPath.concat(validStatus)
		} else {
			newValid = []
			newValid.push(validStatus)
		}
		eventRef.update({
			validPath: newValid
		}).then(
			console.log('sucessfully updated')
		).catch(function(error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		})}).catch( (error) => {
			console.error("Error fetching", error ) }
		)
	});
