import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Card } from 'react-native-material-ui';
import * as Animatable from 'react-native-animatable';
import { Divider } from 'react-native-material-ui';

export default class HomeContent extends Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
  }

  navigateToDetails(call) {
    this.props.navigation.navigate('Details', {
      call: call,
    })
  }

  getData(activeCalls) {
    if(!activeCalls || activeCalls.length === 0) {
      console.log("nothing")
      return (
        <View style={styles.emptyView}>
          <Text style={styles.text}>{`There are no active calls!`}</Text>
          <Button primary raised text="Start one Now" onPress={() => this.props.navigation.navigate('CreateCall')} />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          {activeCalls.map((obj, idx) => {
            const title = obj.title;
            const creator = obj.creator;
            const hour = (new Date(obj.startedAt)).getHours();
            let icon = require('../../assets/images/morning.jpg');
            if(hour > 18) {
              icon = require('../../assets/images/night.jpg');
            } else if (hour > 12) {
              icon = require('../../assets/images/dusk.jpg');
            }
            return (
              <Animatable.View animation="zoomInUp" key={idx}>
                <TouchableOpacity style={styles.callItemCard} onPress={() => this.navigateToDetails(obj)}>
                  <Image style={{width: '100%', height: 80}} source={icon} />
                  <Text style={styles.callItemTitle}>{title}</Text>
                  <Text style={styles.callItemCreator}>Created by: {creator}</Text>
                </TouchableOpacity>
                <Divider />
              </Animatable.View>
            )
          })}
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.activeCalls && (
          <View style={{flex: 1}}>
            {this.getData(this.props.activeCalls)}
          </View>
        )}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  createButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#0aa0d9',
    width: '100%',
  },
  emptyView: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  callItemCard: {
    padding: 0,
    marginTop: 20,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  callItemTitle: {
    textAlign: 'left',
    color: '#000',
    fontSize: 25,
    fontFamily: 'Lato-Regular',
    paddingLeft: 10,
    paddingRight: 10,
  },
  callItemCreator: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Lato-Light',
    paddingLeft: 10,
    paddingRight: 10,
  }
});
