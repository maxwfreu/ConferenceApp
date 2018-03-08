import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Card } from 'react-native-material-ui';

export default class HomeContent extends Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }

  getData(activeCalls) {
    if(!activeCalls || activeCalls.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.text}>{`There are no active calls!`}</Text>
        </View>
      )
    }
    const callObjects = Object.keys(activeCalls);
    return (
      <View>
        {callObjects.map((data, idx) => {
          const obj = activeCalls[callObjects[idx]];
          const title = obj.title;
          const creator = obj.creator;
          return (
            <View style={styles.callItemView} key={idx}>
              <Card onPress={() => this.props.navigation.navigate('Details')}>
                <View style={styles.callItemCard}>
                  <Text style={styles.callItemTitle}>{title}</Text>
                  <Text style={styles.callItemCreator}>Created by: {creator}</Text>
                </View>
              </Card>
            </View>
          )
        })}
      </View>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView>
          <View style={{flex: 1}}>
            {this.props.activeCalls && (
              <View>
                {this.getData(this.props.activeCalls)}
              </View>
            )}
          </View>
        </ScrollView>
        <Button raised primary text="Start A Call" onPress={this.props.createCall} />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#0aa0d9',
    width: '100%',
  },
  emptyView: {
    marginTop: 10,
  },
  callItemCard: {
    padding: 10,
    height: 100,
    marginTop: 20,
  },
  callItemView: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  callItemTitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 25,
    fontFamily: 'Lato-Regular',
  },
  callItemCreator: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Lato-Light',
  }
});
