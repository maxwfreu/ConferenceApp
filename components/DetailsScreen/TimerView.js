import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TimerView extends Component {
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
      const time = this.state.time;
      const seconds = ('0' + time % 60).slice(-2);
      const minutes = ('0' + parseInt(time / 60)).slice(-2);
      const hours = ('0' + parseInt(minutes / 60)).slice(-2);
      return (
        <View style={styles.timerView}>
          <Text style={styles.timerHeader}>Meeting Duration: </Text>
          <Text style={styles.timer}>{hours}:{minutes}:{seconds}</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
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
