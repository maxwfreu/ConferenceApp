import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import SignIn from './components/SignIn';
import CreateProfile from './components/SignIn/CreateProfile';
import Main from './components/Main';
import NewMain from './components/NewMain';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-spinkit';
import FirebaseUtils from './static/firebase-utils';
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
    this.signIn = this.signIn.bind(this);
    this.confirmCode = this.confirmCode.bind(this);
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

  signIn(phoneNumber) {
    this.setState({ phoneNumber: phoneNumber});
  };

  confirmCode(user) {
    if(user) {
      this.setState({ user })
    }
  };

  updateUserProfile(displayName, phoneNumber, photoURL) {
    console.log("SAVING")
    FirebaseUtils.saveUserAccount(displayName, phoneNumber, photoURL, () => {
      this.setState({
        updateProfile: false,
        user: firebase.auth().currentUser,
      });
    }, () => {
      this.setState({
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
    // if(user && loaded && !setDisplayName) {
    //   return (
    //     <Main
    //       user={user}
    //     />
    //   )
    // }
    if(user && loaded && !setDisplayName) {
      return (
        <NewMain />
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4e4e4' }}>
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
