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
    }
  };

  constructor() {
    super();
    this.state = {
      time: 0,
    };
    this.setupTimer = this.setupTimer.bind(this);
  }

  componentDidMount() {
    this.setupTimer();
  }

  setupTimer() {
    const that = this;
    setInterval(function(){
      that.setState({
        time: that.state.time + 1,
      });
    }, 1000);
  }

  render() {
    // BackgroundTimer.runBackgroundTimer(() => {
    // //code that will be called every 3 seconds
    // },
    // 3000);
    const seconds = ('0' + this.state.time % 60).slice(-2);
    const minutes = ('0' + parseInt(this.state.time / 60)).slice(-2);
    const hours = ('0' + parseInt(minutes / 60)).slice(-2);
    return (
      <View style={styles.view}>
        <View style={styles.timerView}>
          <Text style={styles.timerHeader}>Meeting Duration: </Text>
          <Text style={styles.timer}>{hours}:{minutes}:{seconds}</Text>
        </View>
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#e4e4e4',
  },
  timerView: {
    flex: 1,
    flexDirection: 'row',
  },
  timerHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  timer: {
    flex: 1,
    fontFamily: 'Lato-Light',
    fontSize: 20,
    textAlign: 'right',
  },
});
