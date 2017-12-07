import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import icon1 from './icon1.png'
import icon2 from './icon2.png'
import icon3 from './icon3.png'

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 320,
	}
});

const slides = [
	{
		key: '1',
		title: 'Welcome to Joul!',
		text: 'Perform green actions.\nEarn Jouls.\nExchange with others!',
		image: icon1,
		imageStyle: styles.image,
		backgroundColor: '#009688',
	},
	{
		key: '2',
		title: 'Do an Action',
		text: 'Reduce emissions by taking the bus.\nStart recording after boarding.\nSubmit before leaving.\n',
		image: icon2,
		imageStyle: styles.image,
		backgroundColor: '#2196F3',
	},
	{
		key: '3',
		title: 'Exchange Your Jouls',
		text: 'We verify actions and award Jouls!\nBuy and Sell anything on the Joul Market.\nOr trade offline and exchange Jouls directly.',
		image: icon3,
		imageStyle: styles.image,
		backgroundColor: '#E91E63',
	}
];

export default class Tutorial extends React.Component {
	_onDone = () => {
		// User finished the introduction. Show "real" app
	}

	render() {
		return (
			<AppIntroSlider
				slides={slides}
				onDone={this._onDone}
			/>
		);
	}
}