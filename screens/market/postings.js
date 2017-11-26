import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Post from './post'

export default class Postings extends React.Component {


	static navigationOptions = {
		headerTitle: 'Joul Market',
		headerRight: 				<Button
			onPress={() => this.toPost()}
			title="Sell Something"
		/>
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.bigText}>Market Screen</Text>
			</View>
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