import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Post from './post'
import Postings from './postings'


const MarketNavigator = StackNavigator({
	Postings: { screen: Postings },
	Post: { screen: Post},
});


export default class Market extends React.Component {

	constructor() {
		super()
	}

	render() {
		return (
			<MarketNavigator/>
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
