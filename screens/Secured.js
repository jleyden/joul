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
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
})


export default class Secured extends React.Component {

	constructor() {
		super()
		this.state = {
			user: null
		}
		this.updateUser = this.updateUser.bind(this)
	}

	updateUser(user) {
		if (user) {
			this.setState({ user })
		} else {
			console.log('signed out')
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

