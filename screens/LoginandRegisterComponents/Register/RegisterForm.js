import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Alert, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { signup } from '../../../redux/actions/auth';
import { register } from '../../../redux/actions/auth';
import { logout } from '../../../redux/actions/auth';
import firebase from 'firebase';
import 'firebase/firestore';



class Login extends React.Component {
    constructor (props) {
      super(props);
	    this.state = {
		    route: 'Register',
		    loaded: true,
		    username: '',
		    email: '',
		    password: '',
		    confirmPassword: '',
	    };
	    this.firestore = firebase.firestore()
    }

    checkFormsAndRegister (e) {
        var errorMessage = "";
        var emailValid = false;
        var usernameValid = false;
        var passwordValid = false;
        var confirmPasswordValid = false;
        //Check that email field is complete and valid
        if (!this.state.email) {
            errorMessage = errorMessage.concat("Email field is empty. ");
        } else if (this.state.email.indexOf('@') < 1) {
            errorMessage = errorMessage.concat("This email is invalid. ");
        } else {
            emailValid = true;
        }
        //Check that username field is complete
        if (!this.state.username) {
            errorMessage = errorMessage.concat("Username field is empty. ");
        } else {
            usernameValid = true;
        }
        //Check that password field is complete
        if (!this.state.password) {
	        errorMessage = errorMessage.concat("Password field is empty. ");
        } else if (this.state.password.length < 6){
		    errorMessage = errorMessage.concat("Password must be at least 6 characters ")
	      } else {
            passwordValid = true;
        }
        //Check that confirm password field is complete and confirm password matches password
        if (!this.state.confirmPassword) {
	        errorMessage = errorMessage.concat("Confirm password field is empty. ");
        }
        if (this.state.password != this.state.confirmPassword) {
            errorMessage = errorMessage.concat(" The passwords do not match.")
        } else {
            confirmPasswordValid = true;
        }
        if (errorMessage) {
            alert(errorMessage);
        }
        if (emailValid && usernameValid && passwordValid && confirmPasswordValid) {
            this.setState({
                loaded: false
            })
            this.signup();
        }
        e.preventDefault();
    }

    // A method to passs the username and password to firebase and make a new user account
	  signup() {
	    this.setState({
	      // When waiting for the firebase server show the loading indicator.
	      loaded: false
	    });
	    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
	      .then((user) => {
	    	  user.updateProfile({
			      displayName: this.state.username
		      }).catch((error) => console.log(error))
		      this.firestore.collection('users').doc(user.uid).set({
	          username: this.state.username,
	          email: user.email,
	          dateAdded: new Date(),
			      wallet: 0,
			      rating: 0
	        }).then( () => {
			        console.log('user added to database!')
				      var email = this.state.email;
				      var pass = this.state.password;
				      this.setState({
					      username: '',
					      email: '',
					      password: '',
					      confirmPassword: '',
					      loaded: true,
				      });
				      this.props.onSignUp(email, pass);
				      AsyncStorage.setItem(
					      'loggedIn', 'true'
				      ).then( () => {
					      console.log('saved login state')
					      this.props.onLogin(this.state.email, this.state.password);
				      }).catch((error) => console.error(error))
			      }
	        ).catch((error) => {
			      if (error.hasOwnProperty('message')) {
				      Alert.alert('registration failed', error.message)
			      }
			        console.log('user addition failed.')
		        }
	        )
	      }).catch((error) => {
	    	  if (error.hasOwnProperty('message')) {
	    	  	Alert.alert('registration failed', error.message)
		      }
          this.setState({ error: 'Authentication failed.', loaded: true });
	        });
	  }
    backToLogin (e) {
      this.props.onLogout();
      e.preventDefault();
    }


    render() {
        return (
            <View style={styles.container}>
              <StatusBar
                  barStyle="light-content"
              />
              <TextInput
                  placeholder="email address"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="next"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                  onSubmitEditing={() => this.usernameInput.focus()}

              />
              <TextInput
                  placeholder="username"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="next"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                  ref={(input) => this.usernameInput = input}
                  onSubmitEditing={() => this.passwordInput.focus()}
              />
              <TextInput
                  placeholder="password"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  secureTextEntry={ true }
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  ref={(input) => this.passwordInput = input}
                  onSubmitEditing={() => this.confirmPasswordInput.focus()}
              />
              <TextInput
                  placeholder="confirm password"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  secureTextEntry={ true }
                  value={this.state.confirmPassword}
                  onChangeText={(text) => this.setState({ confirmPassword: text })}
                  ref={(input) => this.confirmPasswordInput = input}
                  onSubmitEditing={(e) => this.checkFormsAndRegister(e)}
              />
              <TouchableOpacity onPress={(e) => this.checkFormsAndRegister(e)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={(e) => this.backToLogin(e)} style={styles.backButton}>
                <Text style={styles.buttonText}>Return to Login</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => { dispatch(login(email, password)); },
        onRegister: () => { dispatch(register()); },
        onSignUp: (email, password) => { dispatch(signup(email, password)); },
        onLogout: () => { dispatch(logout()); },
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20
  },
  formText: {
      color: 'white',
      fontWeight: '500',
      padding: 10,
      opacity: 1
  },
  bigText: {
      color: 'white',
      fontSize: 60,
      opacity: 1
  },
  buttonContainer: {
      backgroundColor: '#336E7B',
      paddingVertical: 15
  },
  backButton: {
    paddingVertical: 15,
    marginBottom: 10,

  },
  buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
  },
  input: {
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      marginBottom: 20,
      color: '#FFFFFF',
      paddingHorizontal: 10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);