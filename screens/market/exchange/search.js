import React from 'react';
import { StyleSheet, Text, View,
  TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore';
//import renderIf from './renderIf';


export default class Search extends React.Component {

  static navigationOptions = {
    headerTitle: 'Search User',
  }

  constructor(props) {
    super(props);
    this.firestore = firebase.firestore()
    this.state = {
      //username: "",
      containsUsername: 0
    }
    this.recDoc = null
  }

  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  containsUsername() {
    if (!this.state.username) {
      return
    }
    const docRef = this.firestore.collection("users")
    var searched = docRef.where("username", "==", this.state.username).onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
            this.setState({
              containsUsername: 2,
            })
          } else {
            this.setState({
              containsUsername: 1,
              recDoc: querySnapshot.docs[0]
            })
          }
          // querySnapshot.forEach( (doc) => {
          //   itemList.push(doc)
          // })
          // this.setState({
          //   items: itemList
          // })
        }
    )
  }

  goToExchange() {
    const recDoc = this.state.recDoc
    const recDocData = recDoc.data()
    this.props.navigation.navigate('Exchange', {
      recDoc: recDoc,
      recDocData: recDocData
    })
  }

  render() {
    const recDoc = this.state.recDoc
    return (
      <View>
        <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            returnKeyType="next"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            //onSubmitEditing={() => this.priceInput.focus()}
        />
        <TouchableOpacity onPress={() => this.containsUsername()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
        <View>
          {this.renderIf(!this.state.containsUsername == 0,
              <View>
              </View>
          )}
          {this.renderIf(this.state.containsUsername == 1,
              <View>
                {recDoc ?
                  <TouchableOpacity onPress={() => this.goToExchange()} style={styles.userButton}>
                    <Text style={styles.userButtonText}>Send Jouls to {this.state.username}</Text>
                  </TouchableOpacity>
                : null}
              </View>
          )}
          {this.renderIf(this.state.containsUsername == 2,
              <View style={styles.userButton}>
                <Text style={styles.userButtonText}>There is no user with this username</Text>
              </View>
          )}


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  userButton: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 10,
  },
  userButtonText: {
    fontSize: 20
  }
});