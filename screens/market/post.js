import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Post extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>Post Screen</Text>
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