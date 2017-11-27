import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import RegisterForm from './RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Login extends React.Component {
    render() {
        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.bigText}>JOUL</Text>
                </View>
                <View style={styles.formContainer}>
                    <RegisterForm/>
                </View>
            </KeyboardAwareScrollView>
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