import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Header, Content, Text, Icon,
   Left, Body, Right, Switch, Title,
   Thumbnail } from 'native-base';
import firebase from 'firebase'
import 'firebase/firestore';
import { List, ListItem } from 'react-native-elements'

import defaultPic from './icons/emoji.png'


export default class App extends React.Component {

	constructor() {
		super()
		this.state = {
			user: null,
			events: null,
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

	// loadEvents() {
	// 	const eventsRef = this.props.screenProps.fireStoreRefs.events
	// 	const eventList = []
	// 	eventsRef.orderBy("time", "desc").get().then((querySnapshot) => {
	// 		querySnapshot.forEach( (doc) => eventList.push(doc.data()))
	// 		this.setState({
	// 			events: eventList
	// 		})
	// 		}
	// 	)
	// }

	updateEvents() {
		const eventsRef = this.props.screenProps.fireStoreRefs.events
		const eventList = []
		eventsRef.orderBy("time", "desc").onSnapshot(
			(querySnapshot) => {
				querySnapshot.forEach( (doc) => eventList.push(doc.data()))
				this.setState({
					events: eventList
				})
			}
		)
	}

  render() {
  	const user = this.props.screenProps.user
	  if (user && !this.state.userData) {
  		this.loadUser()
	  }
	  if (!this.state.events && user) {
		  this.updateEvents()
	  }
	  const userData = this.state.userData
	  const events = this.state.events
	  let rating
	  let wallet
	  if (userData) {
  		rating = userData.rating.toString()
		  wallet = userData.wallet.toString()
	  }
	  if (events) {
  		console.log(events)
	  }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Text style={styles.rating}>{`Rating: ${rating}`}</Text>
          </Left>
          <Body>
            <Title style={styles.displayName}>{user ? user.displayName : null}</Title>
          </Body>
          <Right>
            <Text style={styles.money}>{`${wallet} jouls`}</Text>
          </Right>
        </Header>
	      <ScrollView>
		      <List containerStyle={{marginBottom: 20}}>
			      { events ?
				      events.map((event, i) => (
					      <ListItem style={{height: 75}}
					                key={i}
					                title={event.type}
					                subtitle={event.time.toString()}
					                rightTitle={event.jouls.toString()}
					      />
				      )) : null
			      }
		      </List>
	      </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  username: {
    color: '#FAFAFA',
    fontSize: 45
  },
  rating: {
    color: '#03A9F4',
    fontSize: 20
  },
  money: {
    color: '#009688',
    fontSize: 20
  },
  item: {
    color: '#FAFAFA',
    padding: 10,
    fontSize: 18,
  },
	displayName: {
  	fontSize: 20
	},
  list: {
    width: '100%'
  }, 
  topRow: {
    padding: 20
  }
});
