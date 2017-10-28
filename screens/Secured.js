import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { connect } from 'react-redux';

import Actions from './actions/index'
import Community from './community/index'
import Market from './market/index'
import Profile from './profile/index'

const App = TabNavigator({
    Community: {
        screen: Community,
    },
    Actions: {
        screen: Actions,
    },
    Market: {
        screen: Market
    },
    Profile: {
        screen: Profile
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
})


export default class Secured extends React.Component {

    render() {
        return (
            //<Register/>
            //<Login/>
             <App/>
        );
    }
}

