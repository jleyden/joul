import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Post from './post'
import firebase from 'firebase'
import 'firebase/firestore';
import { List, ListItem } from 'react-native-elements'

export default class Postings extends React.Component {

	static navigationOptions = {
		headerTitle: 'Joul Market',
	}
  constructor() {
    super()
    this.state = {
      user: null,
      items: null,
      userData: null
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

  updateItems() {
    const marketRef = this.firestore.collection('market')
    marketRef.orderBy("time", "desc").onSnapshot(
        (querySnapshot) => {
          const itemList = []
          querySnapshot.forEach( (doc) => {
            itemList.push(doc.data())
          })
          this.setState({
            items: itemList
          })
        }
    )
  }

	render() {
    const user = this.props.screenProps.user
    if (user && !this.state.userData) {
      this.loadUser()
    }
    if (!this.state.items && user) {
      this.updateItems()
    }
    const userData = this.state.userData
    const items = this.state.items
		return (
			<View style={styles.container}>
				<View>
					<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Post', {})}
							style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Sell Something</Text>
					</TouchableOpacity>
				</View>
          <ScrollView  style={styles.scrollContainer}>
              <List style={styles.listContainer}>
                  { items ?
                      items.map((item, i) => (
                          <ListItem containerStyle={styles.box}
                                    titleStyle={styles.listTitle}
                                    key={i}
                                    title={item.title}
                                    subtitle={'$' + item.price}
                                    onPress={
                                      () => this.props.navigation.navigate('Item', {
                                        itemTitle: item.title,
                                        itemPrice: item.price,
                                        itemTime: item.time,
                                        itemDescription: item.description,
                                      })}
                          />
                      )) : null
                  }
              </List>
          </ScrollView>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#009688'

//alignItems: 'center',
  },
	scrollContainer: {
	  flex: 1,
	},
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2
  },
  box: {
    margin: 2,
    width: Dimensions.get('window').width / 2 -6,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  listItem: {
    height: 75,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#242424',
    padding: 5
  },
  listTitle: {
    color: '#009688'
  }

});