import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInpu, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
export default class Login extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.bigText}>JOUL</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
    },
    formContainer: {
        height: 160,
    },
    bigText: {
        color: 'white',
        fontSize: 60,
        opacity: 1
    }
});