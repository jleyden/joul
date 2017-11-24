import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import icon from './market.png'

export default class Market extends React.Component {

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
