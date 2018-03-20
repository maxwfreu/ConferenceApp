import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity style={styles.imageWrap} onPress={() => firebase.auth().signOut()}>
          <Image
            style={styles.profileImage}
            source={{uri: firebase.auth().currentUser.photoURL}}
            />
        </TouchableOpacity>
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
  content: {
    flex: 1,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 15,
  }
});
