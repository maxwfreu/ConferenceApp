import React, { Component } from 'react';
import { View, Image, Button, Text, TextInput, StyleSheet } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';

export default class DetailsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Details',
      headerLeft: (
        <Button onPress={() => navigation.goBack()} title="Back" color="#000" />
      ),
      headerRight: (
        <Button onPress={() => navigation.navigate('Details')} title="Past Calls" color="#000" />
      ),
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
