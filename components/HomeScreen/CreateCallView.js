import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Button } from 'react-native-material-ui';
import simpleContacts from 'react-native-simple-contacts';
import * as Animatable from 'react-native-animatable';
import { List, ListItem, SearchBar } from "react-native-elements";

// import DropDown, { Select, Option, OptionList } from 'react-native-selectme';

export default class CreateCallView extends Component {
  constructor() {
    super();
    this.state = {
      callName: '',
      section: 0,
      contacts: [],
    }
    this.finishCallCreation = this.finishCallCreation.bind(this);
  }

  componentDidMount() {
    simpleContacts.getContacts().then((contacts) => {
      // Do something with the contacts
      this.setState({contacts: contacts})
    });
  }

  finishCallCreation() {
    this.props.finishCallCreation(this.state.callName);
  }

  render() {
    const { section, callName, contacts} = this.state;
    if( section === 0 ) {
      return (
        <CallDetails
          callName={callName}
          onChangeText={value => this.setState({ callName: value })}
          next={() => this.setState({section: 1})}
        />
      );
    } else if (section === 1) {
      return (
        <InviteView
          finish={this.finishCallCreation}
          contacts={contacts}
          back={() => this.setState({section: 0})}
        />
      )
    }
    return null
  }
}

const CallDetails = (props) => (
  <Animatable.View animation="fadeInLeft">
    <TextInput
      autoFocus
      style={styles.textInput}
      onChangeText={props.onChangeText}
      placeholder="Call Name"
      value={props.callName}
    />
    <Button raised primary text="Next" onPress={props.next} />
  </Animatable.View>
);

const InviteView = (props) => (
  <Animatable.View animation="fadeInLeft">
    <FlatList
      data={props.contacts}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.number}</Text>
        </View>
      )}
    />
    <Button raised primary text="Create" onPress={props.finish} />
    <View style={styles.cancelButton} >
      <Button raised accent text="Back" onPress={props.back} />
    </View>
  </Animatable.View>
);

// <Button raised primary text="Create" onPress={this.finishCallCreation} />
// <View style={styles.cancelButton} >
//   <Button raised accent text="Cancel" onPress={this.props.cancelCallCreation} />
// </View>

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
