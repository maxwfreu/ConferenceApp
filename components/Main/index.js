import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../HomeScreen';
import DetailsScreen from '../DetailsScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
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
