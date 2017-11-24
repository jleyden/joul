import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>Community Screen</Text>
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
