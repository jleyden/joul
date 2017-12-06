import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Post from './post'
import Postings from './postings'
import Item from './item'
import Search from './exchange/search'
import Exchange from './exchange/exchange'
import icon from './market.png'


const MarketNavigator = StackNavigator({
	Postings: { screen: Postings },
	Post: { screen: Post},
	Item: { screen: Item},
	Search: { screen: Search },
	Exchange: {screen: Exchange}
});


export default class Market extends React.Component {

	constructor() {
		super()
	}

    static navigationOptions = {
    	tabBarLabel: 'Market',
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
			<MarketNavigator screenProps={this.props.screenProps}/>
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
