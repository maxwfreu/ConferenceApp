import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';

export default class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
    }
    this.updateCredentials = this.updateCredentials.bind(this);
  }

  updateCredentials() {
    const { displayName } = this.state;
    if (displayName === '') {
      this.props.onClick(this.props.phoneNumber);
    }
    this.props.onClick(this.state.displayName);
  }

  render() {
    const { val } = this.state;
    return (
      <View style={styles.view}>
        <Text style={styles.title}> {`You seem new here`} </Text>
        <Text style={styles.text}> Create your account </Text>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={value => this.setState({ displayName: value })}
          placeholder="Your Name"
          value={val}
        />
        <Button title="Finish" color="#0aa0d9" style={styles.button} onPress={this.updateCredentials} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
    backgroundColor: '#2d3033',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#0aa0d9',
    fontSize: 50,
    textAlign: 'center',
    position: 'absolute',
    top: '15%',
  },
  textInput: {
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    color: '#0aa0d9',
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#0aa0d9',
    borderRadius: 5,
    width: '90%',
  },
  text: {
    color: '#0aa0d9',
    fontSize: 20,
    textAlign: 'center',
  },
});
