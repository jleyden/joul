import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';

export default class Item extends React.Component {

  static navigationOptions = {
    headerTitle: 'Joul Market',
  }
  constructor() {
    super()
    this.state = {
      user: null,
      userData: null,
      sellerData: null
    }
    this.firestore = firebase.firestore()
  }

  loadUser() {
    const userRef = this.props.screenProps.fireStoreRefs.user
    userRef.get().then( (doc) => {
          this.setState({
            userData: doc.data()
          })
        }
    )
  }
  loadSeller(ref) {
    ref.get().then( (doc) => {
          this.setState({
            sellerData: doc.data()
          })
        }
    )
  }

  render() {
    const user = this.props.screenProps.user
    if (user && !this.state.userData) {
      this.loadUser()
    }
    const userData = this.state.userData
    const title =  this.props.navigation.state.params.itemTitle
    const price =  this.props.navigation.state.params.itemPrice
    const sellerRef =  this.props.navigation.state.params.sellerRef
    this.loadSeller(sellerRef)
    const sellerData = this.state.sellerData
    console.log(sellerData.username)
    const description =  this.props.navigation.state.params.itemDescription
    return (
        <View style={styles.container}>
          <View style={styles.topTextBox}>
            <View style={styles.headText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            {/*<Text>{this.state.sellerData.username}</Text>*/}
            <Text>Username</Text>
          </View>
          <Text style={styles.descriptionTextBox}>{description}</Text>
          <Text style={styles.emailTextBox}>Email usersEmail for more information</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text>BUY</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688'
  },
  topTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  descriptionTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  emailTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    margin: 10,
    color: 'grey'
  },
  headText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 25,
    fontWeight: '500'
  },
  price: {
    fontSize: 25,
    fontWeight: '500'
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },


});