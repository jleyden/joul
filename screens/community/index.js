import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Header, Body, Title, Container } from 'native-base'
import firebase from 'firebase'
import 'firebase/firestore';
import { List, ListItem } from 'react-native-elements'

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
				{this.state.totalJouls === null || this.state.updates === null ?
					<ActivityIndicator size="large" color="#e91e63"/> :
					<ScrollView contentContainerStyle={styles.container}>
						<View style={{ justifyContent: 'flex-start', alignItems:'flex-start'}}>
							<Title style={styles.bigText}>{'Jouls in circulation: ' + this.state.totalJouls.toString()}</Title>
							<Title style={styles.bigText}>{'Total trips: ' + this.state.totalTrips.toString()}</Title>
							<Title style={styles.bigText}>{'Total trades: ' + this.state.totalTrades.toString()}</Title>
						</View>
						<View style={{width: '100%', marginTop: 20}}>
							<Title style={styles.bigText}>{'Recent Activity'}</Title>
							<List containerStyle={styles.list}>
								{this.state.updates.map((update, i) => (
									<ListItem containerStyle={styles.listItem}
									titleStyle={styles.listTitle}
									key={i}
									title={update.username + ' completed a ' + update.event}
									subtitle={update.time.toDateString()}
									hideChevron={true}/>))
								}
							</List>
						</View>
					</ScrollView>}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
	  width: '100%'
  },
  bigText: {
    color: '#009688',
    fontSize: 20
  },
	chartBox: {
  	width: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	list: {
		margin: 20
	},
	listItem: {
		height: 75,
		borderStyle: 'solid',
		borderWidth: 5,
		borderColor: '#242424',
		padding: 5
	},
	listTitle: {
		color: '#009688'
	}
});
