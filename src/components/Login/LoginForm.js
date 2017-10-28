import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';

export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    />
                <TextInput
                    placeholder="username or email address"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="next"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    seureTextEntry={true}
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    />


                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    formText: {
        color: 'white',
        fontWeight: '500',
        padding: 10,
        opacity: 1
    },
    bigText: {
        color: 'white',
        fontSize: 60,
        opacity: 1
    },
    buttonContainer: {
        backgroundColor: '#336E7B',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});