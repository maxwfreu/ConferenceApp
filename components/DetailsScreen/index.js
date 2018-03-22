import React, { Component } from 'react';
import { View, Image, Button, Text, TextInput, StyleSheet } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';
import FirebaseUtils from '../../static/firebase-utils';
import MainDetailView from './MainDetailView';
import TimerView from './TimerView';

export default class DetailsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      title: (params && params.call) ? params.call.title : 'Details',
      headerLeft: (
        <Button onPress={() => navigation.goBack()} title="Back" color="#000" />
      ),
    }
  };

  constructor() {
    super();
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  getMembers() {
    const { params } = this.props.navigation.state;
    FirebaseUtils.getMembersInCall(params.call.key, (obj) => {
      if(obj && obj.members) {
        FirebaseUtils.getMemberDetailsInCall(obj.members, (num, member) => {
          if(member) {
            member.exists = true;
            this.setState({
              members: update(this.state.members,
                 {$push: [member]}
              )
            });
          } else{
            const tempMember = {
              displayName: num,
              exists: false,
            }
            this.setState({
              members: update(this.state.members,
                 {$push: [tempMember]}
              )
            });
          }
        })
      }
    });
  }

  render() {
    // BackgroundTimer.runBackgroundTimer(() => {
    // //code that will be called every 3 seconds
    // },
    // 3000);
    return (
      <View style={styles.view}>
        <View style={styles.timerView}>
          <TimerView />
        </View>
        <View style={styles.mainView}>
          <MainDetailView members={this.state.members} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    paddingTop: 25,
  },
  timerView: {
    height: 30,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
  },
  mainView: {
    width: '100%',
    height: '100%',
  }
});
