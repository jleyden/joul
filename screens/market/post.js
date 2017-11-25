import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Post extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            price: 0,
            user: '',
        };
        this.firestore = firebase.firestore()
    }
    componentDidMount() {
        this.setState({
            user: this.props.screenProps.user,
        })
    }


    checkFields() {
        //check field logic

        this.savePosting();
    }
    savePosting() {
        console.log("saving posting");
        let timestamp = new Date();
        let docref = null;
        this.firestore.collection(`market`).add({
            available: true,
            time: timestamp,
            description: this.state.description,
            price: this.state.price,
            user: this.props.screenProps.fireStoreRefs.user,
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            docref = docRef;
        }.bind(this))
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        this.refPostToUser(timestamp, docref);
    }
    refPostToUser(timestamp, docref) {
        this.firestore.collection(`users/${this.state.user.uid}/items`).add({
            Time: timestamp,
            DocRef: docref,
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        }.bind(this))
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }
    

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        onSubmitEditing={() => this.priceInput.focus()}
                    />
                    <TextInput
                        placeholder="Price"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.input}
                        keyboardType='numeric'
                        autoCorrect={false}
                        value={this.state.price}
                        onChangeText={(text) => this.setState({ price: parseFloat(text) })}
                        ref={(input) => this.priceInput = input}
                        onSubmitEditing={() => this.descriptionInput.focus()}
                    />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.description}
                        value={this.state.password}
                        multiline={true}
                        onChangeText={(text) => this.setState({ description: text })}
                        ref={(input) => this.descriptionInput = input}
                        // onSubmitEditing={() => this.confirmPasswordInput.focus()}
                    />
                    <TouchableOpacity onPress={() => this.checkFields()} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>POST</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
        //alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10,
    },
    description: {
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        fontSize: 17
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
});