import React, { Component } from 'react';
import { View, TouchableOpacity, Button, Text, TextInput, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';

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
            <TouchableOpacity key={idx} style={styles.callItemView} onPress={() => this.props.navigation.navigate('Details')}>
               <Text style={styles.callItemTitle}>{title}</Text>
               <Text style={styles.callItemCreator}>Created by: {creator}</Text>
            </TouchableOpacity>
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
        <View style={styles.createButton}>
          <Button color="#fff" title="Start A Call" onPress={this.props.createCall}/>
        </View>
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
  callItemView: {
    padding: 10,
    backgroundColor: '#90EE90',
    borderWidth: .5,
    borderRadius: 5,
    height: 100,
    marginTop: 20,
    width: '100%',
  },
  callItemTitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 25,
  },
  callItemCreator: {
    textAlign: 'center',
    color: '#000',
  }
});
