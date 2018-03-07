import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class PastCalls extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Past Calls',
      headerLeft: (
        <Button onPress={() => navigation.goBack()} title="Back" color="#000" />
      ),
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Past Calls</Text>
      </View>
    );
  }
}
