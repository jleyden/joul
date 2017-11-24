import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Post from './post'

export default class Postings extends React.Component {

	static navigationOptions = {
		tabBarLabel: 'Market'
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.bigText}>Market Screen</Text>
				<Button
					onPress={() => this.props.navigation.navigate('Post', { })}
					title="Sell Something"
				/>
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