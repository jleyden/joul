import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore';

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
			}
		}
		this.updateUser = this.updateUser.bind(this)
		this.firestore = firebase.firestore()
	}

	updateUser(user) {
		if (user) {
			const userRef = this.firestore.collection('users').doc(user.uid)
			const eventsRef = userRef.collection('events')
			this.setState({
				user,
				fireStoreRefs: {
					user: userRef,
					events: eventsRef
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
    return (
         <App screenProps={this.state}/>
    );
  }
}

