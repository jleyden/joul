// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase = require('firebase')
require('firebase/firestore')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.validateTrip = functions.firestore
	.document('users/{userId}/events/{eventId}')
	.onCreate(event => {
		// Get an object representing the document
		// e.g. {'name': 'Marie', 'age': 66}
		var newValue = event.data.data();
		const eventRef = event.data.ref
		eventRef.update({
			hello: 'hi'
		}).then(
			console.log('sucessfully updated')
		).catch(function(error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		})
	});