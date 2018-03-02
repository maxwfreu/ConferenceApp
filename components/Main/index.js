import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
    }
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.view} >
        <Text style={{ fontSize: 25 }}>Signed In!</Text>
        <Text>{JSON.stringify(this.state.user)}</Text>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#2d3033',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
