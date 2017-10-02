import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default class Profile extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Profile'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>Profile Screen</Text>
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
