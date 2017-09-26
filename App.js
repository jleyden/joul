import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>Hello World!</Text>
        <Text>Welcome to Project194</Text>
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
