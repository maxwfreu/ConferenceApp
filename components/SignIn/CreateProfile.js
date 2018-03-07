import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class CreateProfile extends Component {
  constructor(props) {
    super(props)
    var Identicon = require('identicon.js');
    var md5 = require('md5');
    var hash = md5(props.user.phoneNumber);
    var base64Icon = new Identicon(hash, 100).toString();
    this.state = {
      displayName: '',
      photoURL: `data:image/gif;base64,${base64Icon}`,
    }
    this.updateCredentials = this.updateCredentials.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateCredentials() {
    const { displayName, photoURL} = this.state;
    if (displayName === '') {
      this.props.onClick(this.props.user.phoneNumber, this.props.user.phoneNumber, photoURL);
      return;
    }
    this.props.onClick(displayName, this.props.user.phoneNumber, photoURL);
  }

  updateImage() {
    var Identicon = require('identicon.js');
    var md5 = require('md5');
    var hash = md5(this.props.phoneNumber + Math.random());
    var base64Icon = new Identicon(hash, 100).toString();
    this.setState({
      photoURL: `data:image/gif;base64,${base64Icon}`,
    })
  }

  render() {
    const { val } = this.state;
    return (
      <View style={styles.view}>
        <Text style={styles.title}> Create your account  </Text>
        <TouchableOpacity onPress={this.updateImage}>
          <Image
            style={styles.profileImage}
            source={{uri: this.state.photoURL}}
            />
        </TouchableOpacity>
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
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: '#0aa0d9',
    fontSize: 30,
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
    width: '100%',
    width: '100%',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: -40,
  }
});
