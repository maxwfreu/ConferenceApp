import React, { Component } from 'react';
import { View, Image, Button, Text, TextInput, StyleSheet, FlatList, ListView } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';
import FirebaseUtils from '../../static/firebase-utils';
import { List, ListItem } from "react-native-elements";

export default class MainDetailView extends Component {

  renderListItem({item}) {
    console.log(item)
    if(item.exists) {
      return (
        <ListItem
          title={item.displayName}
          subtitle="This member exists"
        />
      );
    } else { 
      return (
        <ListItem
          title={item.displayName}
          subtitle="This member does not exist"
        />
      );
    }
  }

  keyExtractor(item, index) {
    return item.displayName;
  }

  render() {
    console.log(this.props.members);
    return(
      <View >
        <List>
          <FlatList
            data={this.props.members}
            renderItem={this.renderListItem}
            keyExtractor={this.keyExtractor}
          />
        </List>
      </View>
    )
  }
}
