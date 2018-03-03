import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      database: firebase.database(),
      data: [],
    }
    this.initListener = this.initListener.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount = () => {
    this.initListener();
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  initListener = () => {
    const userId = firebase.auth().currentUser.uid;
    const { database } = this.state;
    const that = this;
    database.ref('test/' + userId).on('value', function(snapshot) {
      that.setState({
        data: update(that.state.data,
          {$push: [snapshot.val()]}
        )
      });
    });
  }

  createCall = () => {
    const userId = firebase.auth().currentUser.uid;
    const { database } = this.state;
    database.ref('test/' + userId).set({
      data: "Hey, this worked again",
    });
  }

  getData() {
    const that = this;
    const { data } = this.state;
    console.log(data);
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    // return null
    return (
      <View>
        {data.map((data, idx) => (
           <View key={idx}>
              <Text style={styles.text}>{data.data}</Text>
           </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.content}>
          {this.getData()}
          <Text style={styles.text}>Start A Call</Text>
          <Button title="Start" onPress={this.createCall}/>
          <Button
            title="Go to Details Page"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
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
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  text: {
    color: '#0aa0d9',
    fontSize: 20,
    textAlign: 'center',
  },
});
