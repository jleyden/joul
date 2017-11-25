import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Post from './post'

export default class Postings extends React.Component {

	static navigationOptions = {
		tabBarLabel: 'Market'
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.bigText}>Market Screen</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Post', { })}
					style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Sell Something</Text>
				</TouchableOpacity>
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
	},
    buttonContainer: {
        backgroundColor: '#336E7B',
        padding: 15,
		margin: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
		fontSize: 15
    },
});