import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { TabNavigator } from 'react-navigation'

import Login from './src/components/Login/Login';
import Register from './src/components/Register/Register';
import Actions from './screens/actions'
import Community from './screens/community'
import Market from './screens/market'
import Profile from './screens/profile'

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


export default class project194 extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
        //<Register/>
        <Login/>
     // <App/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigText: {
    color: '#009688',
    fontSize: 30
  }
});
