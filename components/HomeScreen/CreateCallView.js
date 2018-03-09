import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-material-ui';
import Contact from 'react-native-contacts';

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
    // Contacts.getAll((err, contacts) => {
    //   if(err === 'denied'){
    //     // error
    //     console.log(err)
    //   } else {
    //     // contacts returned in []
    //     console.log(contacts)
    //   }
    // })
    return(
      <View>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={value => this.setState({ callName: value })}
          placeholder="Call Name"
          value={this.state.callName}
        />
        <Button raised primary text="Create" onPress={this.finishCallCreation} />
        <View style={styles.cancelButton} >
          <Button raised accent text="Cancel" onPress={this.props.cancelCallCreation} />
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
  cancelButton: {
    marginTop: 5,
  }
});
