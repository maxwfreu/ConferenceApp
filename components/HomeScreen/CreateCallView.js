import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Dimensions} from 'react-native';

export default class CreateCallView extends Component {
  constructor() {
    super();
    this.state = {
      callName: '',
    }
    this.finishCallCreation = this.finishCallCreation.bind(this);
  }

  finishCallCreation() {
    this.props.finishCallCreation(this.state.callName);
  }

  render() {
    return(
      <View>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={value => this.setState({ callName: value })}
          placeholder="Call Name"
          value={this.state.callName}
        />
        <View style={styles.finishButton}>
          <Button color="#fff" title="Create" onPress={this.finishCallCreation}/>
        </View>
        <View style={styles.cancelButton}>
          <Button color="#fff" title="Cancel" onPress={this.props.cancelCallCreation}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignSelf: 'center',
  },
  finishButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: '#0aa0d9',
    width: '100%',
  },
  cancelButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: '#CD5C5C',
    width: '100%',
    marginTop: 5,
  }
});
