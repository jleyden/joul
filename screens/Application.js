import React from 'react';
import { connect } from 'react-redux';
import Secured from './Secured';
import Logins from './LoginandRegisterComponents/Login/index';
import Register from './LoginandRegisterComponents/Register/Register';
import firebase from 'firebase';
import { AsyncStorage, ActivityIndicator } from 'react-native'

import Tutorial from './tutorial'



class Application extends React.Component {

	constructor() {
		super()
		this.state = {
			isLoggedIn: false,
			loadedLogin: false
		}
		AsyncStorage.getItem('loggedIn').then((value) => {
			if (value === 'true') {
				this.setState({
					isLoggedIn: true,
					loadedLogin: true
				})
			} else {
				this.setState({
					isLoggedIn: false,
					loadedLogin: true
				})
			}
		})
	}

  componentWillMount() {
    firebase.initializeApp({
	    apiKey: "AIzaSyCyMpjgbuOf2tVH6aOKYxg3jMOG7nQPlSA",
	    authDomain: "joul-3afc1.firebaseapp.com",
	    databaseURL: "https://joul-3afc1.firebaseio.com",
	    projectId: "joul-3afc1",
	    storageBucket: "joul-3afc1.appspot.com",
	    messagingSenderId: "870174821785"
    })
  }

  render() {
		if (this.state.loadedLogin === false) {
			return <ActivityIndicator size="large" color="#e91e63"/>
		}
    if (this.state.isLoggedIn  || this.props.isLoggedIn) {
      if (this.props.tutorial) {
        return <Tutorial/>;
      } else {
        return <Secured />;
      }
    } else if (this.props.register) {
      return <Register/>
    } else {
      return <Logins />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register,
        tutorial: state.auth.tutorial
    };
}

export default connect(mapStateToProps)(Application);


