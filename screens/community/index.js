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
		this.firestore.collection('community/root/updates').orderBy("time", "desc").limit(20)
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
			<Container style={styles.container}>
			<Header>
				<Body>
					<Title>Community</Title>
				</Body>
			</Header>
				{this.state.totalJouls === null || this.state.updates === null ?
					<ActivityIndicator size="large" color="#e91e63"/> :
					<ScrollView>
						<View style={styles.stats}>
							<View style={{width: '33%', backgroundColor: '#0288D1'}}>
								<Title style={styles.bigText}>{this.state.totalTrips.toString()}</Title>
								<Title>Total Trips</Title>
							</View>
							<View style={{width: '33%',backgroundColor: '#FDD835' }}>
								<Title style={styles.bigText}>{this.state.totalJouls.toString()}</Title>
								<Title>Jouls in Flow</Title>
							</View>
							<View style={{width: '33%', backgroundColor: '#009688' }}>
								<Title style={styles.bigText}>{this.state.totalTrades.toString()}</Title>
								<Title> Total Trades</Title>
							</View>
						</View>
						<View style={{width: '100%', marginTop: 20}}>
							<Title style={styles.recentActivity}>{'Recent Activity'}</Title>
							<List containerStyle={styles.list}>
								{this.state.updates.map((update, i) => (
									<ListItem containerStyle={styles.listItem}
									titleStyle={styles.listTitle}
									key={i}
									title={update.username + ' completed a ' + update.event}
									subtitle={update.time.toDateString()}
									hideChevron={true}
									backgroundColor={update.event == 'transit event' ? '#0288D1' : '#009688'}
									          subtitleStyle={{color: 'white'}}/>))
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
    justifyContent: 'flex-start',
	  width: '100%'
  },
	stats: {
  	justifyContent: 'space-between',
		alignItems:'center',
		flex: 1,
		flexDirection: 'row'
	},
  bigText: {
    color: 'black',
    fontSize: 40,
	  fontWeight: 'bold'
  },
	recentActivity: {
		color: 'black',
		fontSize: 23,
		fontWeight: 'bold'
	},
	chartBox: {
  	width: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	list: {
		margin: 0,
		borderColor: 'white'
	},
	listItem: {
		height: 75,
		borderStyle: 'solid',
		borderWidth: 3,
		borderColor: 'white',
		padding: 5
	},
	listTitle: {
		color: 'black',
		fontWeight: 'bold'
	}
});
