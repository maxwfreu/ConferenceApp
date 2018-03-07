import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../HomeScreen';
import DetailsScreen from '../DetailsScreen';
import PastCalls from '../PastCalls';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    PastCalls: {
      screen: PastCalls,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class Main extends Component {
  render() {
    return <RootStack />;
  }
}
