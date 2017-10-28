import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { register } from '../../../redux/actions/auth';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            route: 'Register',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            emailValid: true,
            usernameValid: true,
            passwordValid: true,
            confirmPasswordValid: true
        };
    }
    checkFormsAndRegister (e) {
        var errorMessage = "";
        //Check that email field is complete and valid
        if (!this.state.email) {
            errorMessage = errorMessage.concat("Email field is empty. ");
        } else if (this.state.email.indexOf('@') < 1) {
            errorMessage = errorMessage.concat("This email is invalid. ");
        } else {
            this.setState({ emailValid: true });
        }
        //Check that username field is complete
        if (!this.state.username) {
            errorMessage = errorMessage.concat("Username field is empty. ");
        } else {
            this.setState({ usernameValid: true });
        }
        //Check that password field is complete
        if (!this.state.password) {
            errorMessage = errorMessage.concat("Password field is empty. ");
        } else {
            this.setState({ passwordValid: true });
        }
        //Check that confirm password field is complete and confirm password matches password
        if (!this.state.confirmPassword) {
            errorMessage = errorMessage.concat("Confirm password field is empty. ");
        }
        if (this.state.password != this.state.confirmPassword) {
            errorMessage = errorMessage.concat(" The passwords do not match.")
        } else {
            this.setState({ confirmPasswordValid: true });
        }
        if (errorMessage) {
            alert(errorMessage);
        }
        if (!this.state.emailValid || !this.state.usernameValid &&
            !this.state.passwordValid || !this.state.confirmPasswordValid) {
            this.props.onLogin(this.state.username, this.state.password);
        }

        e.preventDefault();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput
                    placeholder="email address"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="next"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    onSubmitEditing={() => this.usernameInput.focus()}

                />
                <TextInput
                    placeholder="username"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="next"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    ref={(input) => this.usernameInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    secureTextEntry={ true }
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.confirmPasswordInput.focus()}
                />
                <TextInput
                    placeholder="confirm password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    secureTextEntry={ true }
                    value={this.state.confirmPassword}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    ref={(input) => this.confirmPasswordInput = input}
                />

                <TouchableOpacity onPress={(e) => this.checkFormsAndRegister(e)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
        onRegister: () => { dispatch(register()); },
        onSignUp: (username, email, password) => { dispatch(signup(username, email, password)); }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10,

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);