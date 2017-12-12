import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Main from './profile'
import Edit from './edit'
import icon from './profile.png'


const ProfileNavigator = StackNavigator({
  Main: { screen: Main },
	Edit: { screen: Edit }
});


export default class Profile extends React.Component {

  constructor() {
    super()
  }

  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
				<Image
						source={icon}
						style={{
              tintColor: tintColor,
              height: 26,
              width: 26
            }}
				/>)
  };

  render() {
    return (
				<ProfileNavigator screenProps={this.props.screenProps}/>
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
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    paddingVertical: 15
  },
});
