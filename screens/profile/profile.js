import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, Alert, View, AsyncStorage} from 'react-native';
import { Container, Header, Content, Text, Icon,
  Left, Body, Right, Switch, Title,
  Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import firebase from 'firebase'
import 'firebase/firestore';
import { List, ListItem } from 'react-native-elements'
import icon from './profile.png'

class Main extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      user: null,
      events: null,
      items: null,
      userData: null,
      display: 0,
      bgc0: '#336E7B',
      bgc1: '#FFFFFF'
    }
    this.firestore = firebase.firestore()
    this.readingUser = false
    this.readingEvents = false
    this.readingItems = false
    this.badgeColors = {
      approved: '#009688',
      pending: '#FFEB3B',
      disapproved: '#FF5722'
    }
  }

  loadUser() {
    const userRef = this.props.screenProps.fireStoreRefs.user
    userRef.onSnapshot( (doc) => {
          this.setState({
            userRef: doc,
            userData: doc.data()
          })
        }
    )
  }

  updateEvents() {
    const eventsRef = this.props.screenProps.fireStoreRefs.user.collection('events')
    eventsRef.orderBy("time", "desc").onSnapshot(
        (querySnapshot) => {
          const eventList = []
          querySnapshot.forEach( (doc) => {
            eventList.push(doc.data())
          })
          this.setState({
            events: eventList,
          })
        }
    )
  }

  updateItems() {
    var username
    var userRef = this.props.screenProps.fireStoreRefs.user
    userRef.onSnapshot( (doc) => {
          userRef = doc
        }
    )
    const docRef = this.firestore.collection("market")
    var searched = docRef.where("user", "==", userRef).
        orderBy("time").onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("No items")
            return
          }
          const itemList = []
          querySnapshot.forEach( (doc) => {
            if (doc.data().available) {
              itemList.push(doc)
            }
          })
          this.setState({
            items: itemList,
          })
        }
    )
  }

  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  confirmLogout() {
	  AsyncStorage.setItem(
		  'loggedIn', 'false'
	  ).then( () => {
		  console.log('saved login state')
		  Alert.alert('Simple logout completed, please restart your session')
	  }).catch((error) => console.error(error))
  }

  logout() {
    // firebase.auth().signOut().then(function() {
    //   this.props.onLogout()
    // }).catch(function(error) {
    //   console.log(error)
    //   console.log("wtf")
    // });
  }

  switch0() {
    this.setState({
      display: 0,
      bgc0: '#336E7B',
      bgc1: '#FFFFFF'
    })
  }

  switch1() {
    this.setState({
      display: 1,
      bgc1: '#336E7B',
      bgc0: '#FFFFFF'
    })
  }

  render() {
    const user = this.props.screenProps.user
    if (user && !this.readingUser) {
      this.loadUser()
      this.readingUser = true
    }
    if (user && !this.readingEvents) {
      this.updateEvents()
      this.readingEvents = true
    }
    if (user && !this.state.items) {
      console.log("updating items in Profile")
      this.updateItems()
      this.readingItems = true
    }
    const userData = this.state.userData
    const events = this.state.events
    const items = this.state.items
    let rating
    let wallet
    if (userData) {
      rating = userData.rating.toString()
      wallet = userData.wallet.toString()
    }
    if (events) {
    }
    return (
        <Container style={styles.container}>
          <Header>
            <Left>
              <Text style={styles.money}>{`${wallet} jouls`}</Text>
            </Left>
            <Body>
            <Title style={styles.displayName}>{user ? user.displayName : null}</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.confirmLogout()}>
                <Text style={styles.logout}>Logout</Text>
              </TouchableOpacity>
            </Right>
          </Header>
          <View style={styles.switchContainer}>
            <TouchableOpacity onPress={() => this.switch0()} style={
              [styles.switch0, {backgroundColor: this.state.bgc0}]}>
              <Text style={[styles.switchText, {color: this.state.bgc1}]}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.switch1()} style={
              [styles.switch1, {backgroundColor: this.state.bgc1}]}>
              <Text style={[styles.switchText, {color: this.state.bgc0}]}>Items</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {this.renderIf(this.state.display == 0,
                <List containerStyle={styles.list}>
                  { events ?
                      events.map((event, i) => (
                          <ListItem containerStyle={styles.listItem}
                                    titleStyle={styles.listTitle}
                                    key={i}
                                    title={event.type}
                                    subtitle={event.time.toDateString()}
                                    badge={{
                                      value: event.jouls,
                                      textStyle: {
                                        color: '#212121',
                                        fontWeight: 'bold'
                                      },
                                      containerStyle: {
                                        backgroundColor: this.badgeColors[event.validation]
                                      }}}
                          />
                      )) : null
                  }
                </List>
            )}
            {this.renderIf(this.state.display == 1,
                <List containerStyle={styles.list}>
                  { items ?
                      items.map((item, i) => (
                          item.data().available ?
                              <ListItem containerStyle={styles.listItem}
                                    titleStyle={styles.listTitle}
                                    key={i}
                                    title={item.data().title}
                                    subtitle={item.data().time.toDateString()}
                                    badge={{
                                      value: item.data().price,
                                      textStyle: {
                                        color: '#212121',
                                        fontWeight: 'bold'
                                      },
                                      containerStyle: {
                                        backgroundColor: '#009688'
                                      }}}
                                    onPress={
                                      () => this.props.navigation.navigate('Edit', {
                                        itemTitle: item.data().title,
                                        itemPrice: item.data().price,
                                        itemDescription: item.data().description,
                                        item: item,
                                        itemTime: item.data().time,
                                        itemID: item.id
                                      })}
                          /> : null
                      )) : null
                  }
                </List>
            )}

          </ScrollView>
        </Container>
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
    onLogout: () => { dispatch(logout()); },
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
  logout: {
    fontSize: 20
  },
  switchContainer: {
    flexDirection: 'row',
  },
  switch0: {
    padding: 8,
    flex: 1,
    alignItems: 'center',

  },
  switch1: {
    padding: 8,
    flex: 1,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
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
    margin: 0,
	  borderWidth: 0
  },
  listItem: {
    height: 75,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#242424',
    padding: 5
  },
  listTitle: {
    color: '#009688'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);