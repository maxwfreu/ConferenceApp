import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import SignIn from './components/SignIn';
import CreateProfile from './components/SignIn/CreateProfile';
import Main from './components/Main';

import firebase from 'react-native-firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      updateProfile: true,
      updateProfileError: false,
      confirmResult: null,
    };
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  componentDidMount() {
    // const user = firebase.auth().currentUser;

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          updateProfile: true,
          updateProfileError: false,
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = (phoneNumber) => {
    this.setState({ phoneNumber: phoneNumber});

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  updateUserProfile = (displayName) => {
    const user = firebase.auth().currentUser;
    const that = this;
    user.updateProfile({
      displayName: displayName,
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

  confirmCode = (codeInput) => {
    const { confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  render() {
    const { user, confirmResult, updateProfile } = this.state;
    let setDisplayName = false;
    if (user) {
      setDisplayName = !user.displayName || user.displayName === '';
    }
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult &&
          <SignIn
            title="Welcome!"
            description="Enter your phone number to sync your device"
            placeholder="Phone number ... "
            initialVal="+1"
            buttonText="Send Verification Code"
            onClick={this.signIn}
          />
        }

        {this.renderMessage()}

        {!user && confirmResult &&
          <SignIn
            title="Message Sent!"
            description="Enter your confirmation code"
            placeholder="Confirmation Code..."
            buttonText="Sign In"
            onClick={this.confirmCode}
          />
        }
        {setDisplayName && updateProfile &&
          <CreateProfile
            phoneNumber={this.state.phoneNumber}
            onClick={this.updateUserProfile}
          />
        }

        {user &&
          <Main
            user={user}
          />
        }
      </View>
    );
  }
}
