import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Main from '../Main';
import PastCalls from '../PastCalls';

/**
 * react-navigation's TabNavigator.
 */
const TabNav = TabNavigator(
  {
    Main: { screen: Main },
    PastCalls: { screen: PastCalls }
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'white',
        rippleColor: 'white',
        tabs: {
          Main: {
            barBackgroundColor: '#0aa0d9'
          },
          PastCalls: {
            barBackgroundColor: '#ff564b'
          }
        }
      }
    }
  }
)

export default class NewMain extends Component {
  render() {
    return <TabNav />;
  }
}
