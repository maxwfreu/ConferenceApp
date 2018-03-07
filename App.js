import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import SignIn from './components/SignIn';
import CreateProfile from './components/SignIn/CreateProfile';
import Main from './components/Main';

import firebase from 'react-native-firebase';
import Spinner from 'react-native-spinkit';
// var Spinner = require('react-native-spinkit');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      codeInput: '',
      updateProfile: true,
      updateProfileError: false,
      confirmResult: null,
      loaded: false,
      phoneNumber: null,
    };
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  componentDidMount() {
    // const user = firebase.auth().currentUser;

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user.toJSON(),
          loaded: true,
        });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          updateProfile: true,
          updateProfileError: false,
          confirmResult: null,
          loaded: true,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = (phoneNumber) => {
    this.setState({ phoneNumber: phoneNumber});
  };

  confirmCode = (user) => {
    if(user) {
      this.setState({ user })
    }
  };

  updateUserProfile = (displayName, phoneNumber, photoURL) => {
    const user = firebase.auth().currentUser;
    const that = this;
    user.updateProfile({
      displayName: displayName,
      photoURL: photoURL,
    }).then(function() {
      // Update successful.
      that.setState({
        updateProfile: false,
        user: firebase.auth().currentUser,
      });
    }).catch(function(error) {
      // An error happened.
      that.setState({
        updateProfileError: true,
      });
    });
  }

  render() {
    const { user, confirmResult, updateProfile, loaded } = this.state;
    let setDisplayName = false;
    if (user) {
      setDisplayName = !user.displayName || user.displayName === '';
    }
    if(user && loaded && !setDisplayName) {
      return (
        <Main
          user={user}
        />
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d3033' }}>
        {!loaded &&
          <Spinner isVisible={true} size={100} type="Wave" color="#1abc9c"/>
        }
        {!user && loaded &&
          <SignIn
            user={user}
            confirmResult={confirmResult}
            onSignIn={this.signIn}
            onConfirmCode={this.confirmCode}
          />
        }
        {setDisplayName && updateProfile && loaded &&
          <CreateProfile
            user={user}
            phoneNumber={this.state.phoneNumber}
            onClick={this.updateUserProfile}
          />
        }
      </View>
    );
  }
}
