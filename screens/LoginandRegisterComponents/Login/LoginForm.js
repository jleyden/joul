import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { register } from '../../../redux/actions/auth';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: ''
        };
    }
    userLogin (e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }
    newUser (e) {
        this.props.onRegister();
        e.preventDefault();
    }
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
                    style={ styles.input }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={ false }
                    onSubmitEditing={() => this.passwordInput.focus()}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={ false }
                    style={ styles.input }
                    secureTextEntry={ true }
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    ref={(input) => this.passwordInput = input}
                    />


                <TouchableOpacity onPress={(e) => this.userLogin(e)} title={this.state.route} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => this.newUser(e)} style={styles.newUserButton}>
                    <Text style={styles.buttonText}>NEW USER</Text>
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
        paddingVertical: 15,
        marginBottom: 0,

    },
    newUserButton: {
        paddingVertical: 15,
        marginBottom: 10,

    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);