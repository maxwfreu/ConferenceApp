import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import update from 'immutability-helper';
import firebase from 'react-native-firebase';
import HomeContent from './HomeContent';
import { StackNavigator } from 'react-navigation';
import { getActiveCalls } from '../../static/firebase-utils';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Card } from 'react-native-material-ui';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Home',
      headerLeft: (
        <Button onPress={() => firebase.auth().signOut()} text="Sign Out" />
      ),
      headerRight: (
        <Button primary text="Start A Call" onPress={() => navigation.navigate('CreateCall')} />
      ),
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
      database: firebase.database(),
      activeCalls: [],
    }
  }

  componentDidMount = () => {
    const { database } = this.state;
    getActiveCalls(database, (calls) => {
      for(const i in calls) {
        const call = calls[i];
        const activeCalls = this.state.activeCalls;
        const inActiveCalls = activeCalls.filter(activeCall => activeCall.key === call.key);
        if(call.active && inActiveCalls.length !== 1) {
          this.setState({
            activeCalls: update(this.state.activeCalls,
               {$push: [call]}
            )
          });
        }
      }
    })
  }

  render() {
    const { user, activeCalls } = this.state;
    return (
      <React.Fragment>
        <View style={styles.header}>
          {user.photoURL &&
            <View style={styles.imageWrap}>
              <Image
                style={styles.profileImage}
                source={{uri: user.photoURL}}
                />
            </View>
          }
          <Text style={styles.text}>Welcome, {user.displayName}</Text>
        </View>
        <View style={styles.view}>
          <View style={styles.content}>
            <HomeContent
              navigation={this.props.navigation}
              activeCalls={activeCalls}
            />
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#264563',
    justifyContent: 'center',
    alignSelf: 'center',
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
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    flex: 2,
    paddingLeft: 20,
    fontFamily: 'Lato-Bold',
  },
  profileImage: {
    borderRadius: 25,
    borderColor: '#ff564b',
    borderWidth: .4,
    flex: 1,
  },
  imageWrap: {
    width: 50,
    height: 50,
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});
