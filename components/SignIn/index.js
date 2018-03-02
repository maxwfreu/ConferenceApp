import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: props.initialVal,
    }
  }
  render() {
    const { val } = this.state;
    return (
      <View style={styles.view}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.text}>{this.props.description}</Text>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={value => this.setState({ val: value })}
          placeholder={this.props.placeholder}
          value={val}
        />
        <Button title={this.props.buttonText} color="#0aa0d9" style={styles.button} onPress={() => this.props.onClick(val)} />
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
