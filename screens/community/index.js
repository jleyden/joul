import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Header, Body, Title, Container } from 'native-base'
import firebase from 'firebase'
import 'firebase/firestore';

import icon from './community.png'

export default class Community extends React.Component {

	static navigationOptions = {
		tabBarLabel: 'Community',
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

	constructor() {
		super()
		this.state = {
			updates: null,
			totalJouls: null,
			totalTrips: null,
			totalTrades: null
		}
		this.firestore = firebase.firestore()
	}

	componentWillMount() {
		// update aggregate data
		this.firestore.collection('community').doc('root')
			.onSnapshot( (doc) => {
				const data = doc.data()
				this.setState({
					totalJouls: data.totalJouls,
					totalTrips: data.totalTrips,
					totalTrades: data.totalTrades
				})
			})

		// update community feed
		this.firestore.collection('community/root/updates').orderBy("time", "desc").limit(7)
			.onSnapshot( (querySnapshot) => {
				const updates = []
				querySnapshot.forEach( (doc) => {
					updates.push(doc.data())
				})
				this.setState({
					updates
				})
			})
	}


	render() {

		return (
			<Container>
			<Header>
				<Body>
					<Title>Community</Title>
				</Body>
			</Header>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.chartBox}>
				</View>
			</ScrollView>
			</Container>
		)
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
	chartBox: {
  	width: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
