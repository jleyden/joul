import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Header, Body, Title, Container } from 'native-base'

import { StockLine } from 'react-native-pathjs-charts'

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

	daysAgo(num) {
		const d = new Date()
		d.setDate(d.getDate() - num);
		return d
	}

	render() {
		let data = [
			[{
				"x": this.daysAgo(10),
				"y": 0
			}, {
				"x": this.daysAgo(9),
				"y": 1
			}, {
				"x": this.daysAgo(8),
				"y": 15
			}, {
				"x": this.daysAgo(7),
				"y": 27
			}, {
				"x": this.daysAgo(6),
				"y": 64
			}, {
				"x": this.daysAgo(5),
				"y": 67
			}, {
				"x": this.daysAgo(4),
				"y": 70
			}, {
				"x": this.daysAgo(3),
				"y": 74
			}, {
				"x": this.daysAgo(2),
				"y": 78
			}, {
				"x": this.daysAgo(1),
				"y": 82
			}, {
				"x": new Date(),
				"y": 82
			}] ]

		let options = {
			height: 280,
			color: '#009688',
			margin: {
				top: 20,
				left: 45,
				bottom: 25,
				right: 20
			},
			animate: {
				type: 'delayed',
				duration: 200
			},
			axisX: {
				showAxis: true,
				showLines: true,
				showLabels: true,
				showTicks: true,
				zeroAxis: false,
				orient: 'bottom',
				label: {
					fontFamily: 'Arial',
					fontSize: 14,
					fontWeight: true,
					fill: '#34495E'
				}
			},
			axisY: {
				showAxis: true,
				showLines: true,
				showLabels: true,
				showTicks: true,
				zeroAxis: false,
				orient: 'left',
				label: {
					fontFamily: 'Arial',
					fontSize: 14,
					fontWeight: true,
					fill: '#34495E'
				}
			}
		}

		return (
			<Container>
			<Header>
				<Body>
					<Title>Community</Title>
				</Body>
			</Header>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.chartBox}>
					<Title>Total Jouls in Market</Title>
					<StockLine data={data} options={options} xKey='x' yKey='y' />
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
