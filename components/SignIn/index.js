import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: '',
      user: props.user,
      confirmResult: props.confirmResult,
      error: false,
    }
    this.signIn = this.signIn.bind(this);
    this.confirmCode = this.confirmCode.bind(this);
  }

  componentDidMount() {
    const { val, user, confirmResult } = this.state;
    if(!user && !confirmResult && val === '') {
      this.setState({
        val: '+1',
      })
    }
  }

  signIn(phoneNumber) {
    const that = this;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        that.props.onSignIn(phoneNumber);
        that.setState({
          confirmResult,
          phoneNumber,
          error: false,
          val: '',
        });
      })
      .catch(error => {
        console.log("ERR")
        console.log(error);
        that.setState({ error: true });
      });
  };

  confirmCode(codeInput){
    const { confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.props.confirmCode(user);
          this.setState({ user });
        })
        .catch(error => this.setState({ error: true }));
    }
  };

  render() {
    const { val, user, confirmResult } = this.state;
    return (
      <View>
        {(!user && !confirmResult )? (
          <SignInView
            title="Welcome!"
            description="Enter your phone number to sync your device"
            placeholder="Phone number ... "
            buttonText="Send Verification Code"
            val={val}
            onChangeText={value => this.setState({ val: value })}
            onClick={this.signIn}
            error={this.state.error}
          />
        ) : (
          <SignInView
            title="Message Sent!"
            description="Enter your confirmation code"
            placeholder="Confirmation Code..."
            buttonText="Sign In"
            val={this.state.val}
            onChangeText={value => this.setState({ val: value })}
            onClick={this.confirmCode}
            error={this.state.error}
          />
        )}
      </View>
    );
  }
}

const SignInView = props => (
  <View style={styles.view}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.text}>{props.description}</Text>
    <TextInput
      autoFocus
      style={styles.textInput}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      value={props.val}
    />
    <View style={styles.button}>
      <Button title={props.buttonText} color="#fff" onPress={() => props.onClick(props.val)} />
    </View>
    {props.error &&
      <Text style={styles.error}>{`That doesn't seem right... try again`}</Text>
    }
  </View>
)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#e4e4e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0aa0d9',
    fontSize: 30,
    textAlign: 'center',
    position: 'absolute',
    top: '15%',
    fontFamily: 'Lato-Bold',
  },
  textInput: {
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    color: '#0aa0d9',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#ff564b',
    borderRadius: 5,
    width: '90%',
    fontFamily: 'Lato-Light',
  },
  text: {
    color: '#0aa0d9',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  error: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0aa0d9',
    width: '100%',
  }
});
