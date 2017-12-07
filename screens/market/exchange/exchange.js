import React from 'react';
import { StyleSheet, Text, View,
  TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'

import firebase from 'firebase'
import 'firebase/firestore';

export default class Exchange extends React.Component {
  static navigationOptions = {
    headerTitle: 'Joul Exchange',
  }

  constructor(props) {
    super(props);
    this.firestore = firebase.firestore()
    this.state = {
      jouls: '',
      didType: 0,
    }
    this.user = this.props.screenProps.user
	  this.userRef = this.props.screenProps.fireStoreRefs.user
  }

  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  checkText(text) {
    if (text) {
      this.setState({
        didType: 1
      })
    } else {
      this.setState({
        didType: 0
      })
    }
  }

  exchange() {
  	const amount = Number(this.state.jouls)
	  const backAction = NavigationActions.back({
		  key: null
	  })
	  this.userRef.get().then( (doc) => {
		  const userData = doc.data()
		  if (userData.wallet < amount) {
			  Alert.alert(
				  'Failure',
				  'insufficient jouls',
				  [
					  {text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}
				  ])
		  } else {
			  this.firestore.collection(`users/${this.user.uid}/payments`).add({
				  receiverRef: this.props.navigation.state.params.recDoc.ref,
				  payerRef: this.userRef,
				  amount
			  }).then(
				  Alert.alert(
					  'Success',
					  'Sent ' + this.props.navigation.state.params.recDocData.username + ' '
					  + this.state.jouls + ' jouls',
					  [
						  {text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}
					  ]
				  )
			  ).catch( (err) => console.error(err))
		  }}).catch( (err) => console.error(err) )

  }

  render() {
    return (
        <View style={styles.container}>
          {/*<Text>Send {this.props.navigation.state.params.recDocData.username} some bread</Text>*/}
          <TextInput
              placeholder="0"
              placeholderTextColor="#FFFFFF"
              returnKeyType="next"
              style={styles.input}
              keyboardType='numeric'
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              value={this.state.jouls}
              onChangeText={(text) => {this.checkText(text); this.setState({ jouls: text })}}
              //onSubmitEditing={() => this.priceInput.focus()}
          />
          {this.renderIf(this.state.didType == 0,
              <View style={styles.fakeButton}>
                <Text style={styles.fakeButtonText}>CONFIRM</Text>
              </View>
          )}
          {this.renderIf(this.state.didType == 1,
              <TouchableOpacity onPress={() => this.exchange()} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
          )}

        </View>
          )
  }





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  input: {
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#009688',
    fontSize: 150,
    marginBottom: 10,
    textAlign:"center",
  },
  fakeButton: {
    backgroundColor: '#336E7B',
    opacity: 0.4,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  fakeButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
})