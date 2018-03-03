import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Dimensions} from 'react-native';
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
      callIds: [],
      data: [],
      createCall: false,
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
    database.ref('userCalls/' + userId).on('value', function(snapshot) {
      console.log(snapshot);
      if(snapshot.val()){
        that.setState({
          callIds: update(that.state.callIds,
            {$set: snapshot.val()}
          )
        });
      }
    });
  }

  createCall = () => {
    this.setState({
      createCall: true,
    });
  }

  getData() {
    const that = this;
    const { callIds } = this.state;
    // if(callIds) {
    //   console.log(callIds)
    //   if(callIds[0]) {
    //     console.log(callIds[0]);
    //     console.log(Object.keys(callIds[0])[0])
    //   }
    // }
    if(!callIds || callIds.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.text}>{`There are no active calls!`}</Text>
        </View>
      )
    }
    const callObjects = Object.keys(callIds);
    for(var i = 0; i < callObjects.length; i++){
      console.log(callIds[callObjects[i]]);
    }

    return (
      <View>
        {callObjects.map((data, idx) => {
          const obj = callIds[callObjects[idx]];
          const title = obj.title;
          const creator = obj.creator;
          return (
            <View key={idx} style={styles.callItemView}>
               <Text style={styles.callItemTitle}>{title}</Text>
               <Text style={styles.callItemCreator}>Created by: {creator}</Text>
            </View>
          )
        })}
      </View>
    );
  }

  cancelCallCreation = () => {
    this.setState({
      createCall: false,
    });
  }

  finishCallCreation = () => {
    const userId = firebase.auth().currentUser.uid;
    const { database } = this.state;
    const callsRef = database.ref('calls').push();
    const userRef = database.ref('userCalls/' + userId).push();
    callsRef.set({
      title: "MVP Sync",
      creator: this.state.user.displayName,
    });
    userRef.set({
      key: callsRef.key,
      title: "MVP Sync",
      creator: this.state.user.displayName,
    });
    this.setState({
      createCall: true,
    });
  }

  render() {
    const { user, data, createCall } = this.state;
    console.log(data);
    return (
      <View style={styles.view}>
        <View style={styles.header}>
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
              data={data}
              getData={this.getData}
            />
          )}
          <View style={styles.createButton}>
            <Button color="#fff" title="Start A Call" onPress={this.createCall}/>
          </View>
        </View>
      </View>
    );
  }
}

const CreateCallView = props => (
  <View>
    <Button color="#fff" title="Create" onPress={props.finishCallCreation}/>
    <Button color="#fff" title="Cancel" onPress={props.cancelCallCreation}/>
  </View>
)

const HomeContent = props => (
  <View style={{flex: 1}}>
    {props.data && (
      <View>
        {props.getData()}
      </View>
    )}
  </View>
)

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
  },
  content: {
    flex: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  createButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#0aa0d9',
    backgroundColor: '#0aa0d9',
  },
  emptyView: {
    marginTop: 10,
  },
  callItemView: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: .5,
    borderRadius: 5,
  },
  callItemTitle: {
    color: '#000',
    fontSize: 25,
  },
  callItemCreator: {
    color: '#000',
  }
});
