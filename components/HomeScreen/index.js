import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';
import CreateCallView from './CreateCallView';
import HomeContent from './HomeContent';
import { StackNavigator } from 'react-navigation';
import { getActiveCalls } from '../../static/firebase-utils';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Home',
      headerLeft: (
        <Button onPress={() => firebase.auth().signOut()} title="Sign Out" color="#000" />
      ),
      headerRight: (
        <Button onPress={() => navigation.navigate('PastCalls')} title="Past Calls" color="#000" />
      ),
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
      database: firebase.database(),
      createCall: false,
      activeCalls: [],
    }
  }

  componentDidMount = () => {
    const { database } = this.state;
    getActiveCalls(database, (call) => {
      if(call.active) {
        this.setState({
          activeCalls: update(this.state.activeCalls,
             {$push: [call]}
          )
        });
      } else {
        this.setState({
          pastCalls: update(this.state.activeCalls,
             {$push: [call]}
          )
        });
      }
    })
  }

  createCall = () => {
    this.setState({
      createCall: true,
    });
  }

  cancelCallCreation = () => {
    this.setState({
      createCall: false,
    });
  }

  finishCallCreation = (callName) => {
    const userId = firebase.auth().currentUser.uid;
    const { database } = this.state;
    const callsRef = database.ref('calls').push();
    const userRef = database.ref('userCalls/' + userId).push();
    callsRef.set({
      title: callName,
      creator: this.state.user.displayName,
      active: true,
    });
    userRef.set({
      key: callsRef.key,
    });
    this.setState({
      createCall: false,
    });
  }

  render() {
    const { user, activeCalls, createCall } = this.state;
    return (
      <View style={styles.view}>
        <View style={styles.header}>
          {user.photoURL &&
            <Image
              style={styles.profileImage}
              source={{uri: user.photoURL}}
              />
          }
          <Text style={styles.text}>Welcome, {user.displayName}</Text>
        </View>
        <View style={styles.content}>
          {createCall ? (
            <CreateCallView
              finishCallCreation={this.finishCallCreation}
              cancelCallCreation={this.cancelCallCreation}
            />
          ): (
            <HomeContent
              navigation={this.props.navigation}
              activeCalls={activeCalls}
              createCall={this.createCall}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#e4e4e4',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 20,
    fontFamily: 'Lato-Bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: 25,
    borderColor: '#ff564b',
    borderWidth: .4,
    flex: 1,
  }
});
