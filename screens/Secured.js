import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore'
import Platform from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

import Actions from './actions/index'
import Community from './community/index'
import Market from './market/index'
import Profile from './profile/index'

const App = TabNavigator({
	Community: {
	screen: Community,
},
Actions: {
	screen: Actions,
},
Market: {
	screen: Market
},
Profile: {
	screen: Profile
}
}, {
	tabBarPosition: 'bottom',
		animationEnabled: false,
		tabBarOptions: {
			activeTintColor: '#e91e63',
			style: {
				marginBottom: isIphoneX() ? 25 : 0
			}
	},
})

export default class Secured extends React.Component {

	constructor() {
		super()
		this.state = {
			user: null,
			fireStoreRefs: {
				user: null,
				events: null,
				items: null,
			}
		}
		this.updateUser = this.updateUser.bind(this)
		this.firestore = firebase.firestore()
	}

	updateUser(user) {
		if (user) {
			const userRef = this.firestore.collection('users').doc(user.uid)
			const eventsRef = userRef.collection('events')
			const itemsRef = userRef.collection('items')
			this.setState({
				user,
				fireStoreRefs: {
					user: userRef,
					events: eventsRef,
					items: itemsRef,
				}
			})
		} else {
			console.log('logged out')
		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(
			this.updateUser
		)

	}

	render() {
		const Navigator = this.navigator
    return (
         <App screenProps={this.state}/>
    );
  }
}

