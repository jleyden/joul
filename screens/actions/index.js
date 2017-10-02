import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default class Actions extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Actions',
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>Action Screen</Text>
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
