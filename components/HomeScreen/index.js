import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <Button onPress={() => firebase.auth().signOut()} title="Sign Out" color="#000" />
    ),
  };
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
      database: firebase.database(),
      data: [],
    }
    this.initListener = this.initListener.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount = () => {
    this.initListener();
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
    if(!data || data.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.text}>{`There are no active calls!`}</Text>
        </View>
      )
    }
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
    const { user, data } = this.state;
    return (
      <View style={styles.view}>
        <View style={styles.header}>
          <Text style={styles.text}>Welcome, {user.displayName}</Text>
        </View>
        <View style={styles.content}>
          {data ? (
            <View>
              {this.getData()}
            </View>
          ) : (
            <View style={styles.createButton}>
              <Button color="#fff" title="Start A Call" onPress={this.createCall}/>
            </View>
          )}
        </View>
      </View>
    );
  }
}
// <Button
//   title="Go to Details Page"
//   color="#fff"
//   onPress={() => this.props.navigation.navigate('Details')}
// />
const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#2d3033',
  },
  header: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  content: {
    flex: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  createButton: {
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#0aa0d9',
    backgroundColor: '#0aa0d9',
  },
  emptyView: {
    marginTop: 10,
  }
});
