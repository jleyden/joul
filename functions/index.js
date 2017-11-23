const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateUser = functions.firestore
	.document('users/{userId}')
	.onUpdate(event => {
		// Get an object representing the current document
		var newValue = event.data.data();

		// ...or the previous value before this update
		var previousValue = event.data.previous.data();
	});
