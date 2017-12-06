import React from 'react';
import { StyleSheet, Text, View, Button,
  TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';

export default class Exchange extends React.Component {
  static navigationOptions = {
    headerTitle: 'Joul Exchange',
  }

  constructor(props) {
    super(props);
    this.firestore = firebase.firestore()
    // this.state = {
    // }
  }

  render() {
    return (
        <Text>Send {this.props.navigation.state.params.recDocData.username} some bread</Text>
    )
  }





}