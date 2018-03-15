import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../HomeScreen';
import DetailsScreen from '../DetailsScreen';
import CreateCallScreen from '../CreateCallScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR, ThemeProvider } from 'react-native-material-ui';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    CreateCall: {
      screen: CreateCallScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: '#0aa0d9',
        accentColor: '#ff564b',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
    card: {
      style: {
        padding: 10,
      },
    }
};

export default class Main extends Component {
  static navigationOptions = {
    tabBarLabel: 'Main',
    tabBarIcon: () => <Icon size={24} name="book" color="white" />
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootStack />
      </ThemeProvider>
    );
  }
}
