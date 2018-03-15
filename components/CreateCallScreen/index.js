import React, { Component} from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Button, Subheader } from 'react-native-material-ui';
import simpleContacts from 'react-native-simple-contacts';
import * as Animatable from 'react-native-animatable';
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';

// import DropDown, { Select, Option, OptionList } from 'react-native-selectme';

export default class CreateCallScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Start A Call ',
      headerLeft: (
        <Button onPress={() => navigation.goBack()} text="Back" />
      ),
    }
  };
  constructor() {
    super();
    this.state = {
      callName: '',
      section: 0,
      contacts: [],
      filteredContacts: [],
      database: firebase.database(),
      loading: true,
    }
    this.finishCallCreation = this.finishCallCreation.bind(this);
    this.filterList = this.filterList.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.itemPress = this.itemPress.bind(this);
  }

  componentWillMount() {
    simpleContacts.getContacts().then((contacts) => {
      // Do something with the contacts
      const jsonContacts = JSON.parse(contacts);
      console.log(contacts)
      this.setState({
        contacts: jsonContacts,
        filteredContacts: jsonContacts,
        loading: false,
      })
    });
  }

  finishCallCreation() {
    const userId = firebase.auth().currentUser.uid;
    const { database, callName } = this.state;
    const callsRef = database.ref('calls').push();
    const userRef = database.ref('userCalls/' + userId).push();
    const startedAt = firebase.database.ServerValue.TIMESTAMP;
    callsRef.set({
      title: callName,
      creator: this.state.user.displayName,
      active: true,
      startedAt: startedAt,
    });
    userRef.set({
      key: callsRef.key,
      title: callName,
      creator: this.state.user.displayName,
      active: true,
      startedAt: startedAt,
    });
  }


  filterList(val) {
    let updatedList = this.state.contacts;
    updatedList = updatedList.filter(function(item){
      return (item.number.toLowerCase().search(val.toLowerCase()) !== -1 || item.name.toLowerCase().search(val.toLowerCase()) !== -1);
    });
    this.setState({filteredContacts: updatedList});
  }

  renderHeader() {
    return <SearchBar placeholder="Invite People" lightTheme round onChangeText={this.filterList}/>;
  };

  renderFooter() {
    if (!this.state.loading) {
      return (null);
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  itemPress(i) {
    let { filteredContacts } = this.state;
    filteredContacts[i].selected = true;
    this.setState({filteredContacts: filteredContacts});
    this.forceUpdate();
  }

  render() {
    const { section, callName, filteredContacts} = this.state;
    return (
      <View style={styles.createCallView}>
        {section === 0 &&
        <View style={styles.nameView}>
          <CallDetails
            callName={callName}
            onChangeText={value => this.setState({ callName: value })}
            next={() => this.setState({section: 1})}
          />
        </View>
        }
        {section === 1 &&
          <InviteView
            contacts={filteredContacts}
            filterList={this.filterList}
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
            finish={this.finishCallCreation}
            itemPress={this.itemPress}
          />
        }
      </View>
    )
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
  <Animatable.View style={styles.inviteView} animation="fadeInLeft">
    <List style={styles.flatList}>
      <FlatList
        style={styles.flatList}
        data={props.contacts}
        renderItem={({item, index}) => {
          console.log(item.selected)
          if(item.selected) {
            return (
              <View>
                <ListItem
                  title={item.name}
                  subtitle={item.number}
                  onPress={() => {
                    props.itemPress(index)
                  }}
                />
              </View>
            )
          } else {
            return (
              <ListItem
                title={item.name}
                subtitle={item.number}
                onPress={() => props.itemPress(index)}
              />
            );
          }
        }}
        ListHeaderComponent={props.renderHeader}
        ListFooterComponent={props.renderFooter}
      />
    </List>
    <View style={styles.buttonView}>
      <Button raised primary text="Create" onPress={props.finishCallCreation} style={{ container: { height: 50} }}/>
    </View>
  </Animatable.View>
);

const styles = StyleSheet.create({
  inviteView: {
    height: '100%',
    padding: 0,
    margin: 0,
  },
  createCallView: {
    height: '100%',
    margin: 0,
    padding: 0,
    flex: 1,
    width: '100%',
  },
  nameView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
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
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cancelButton: {
    marginTop: 5,
  },
  flatList: {
    height: '100%',
    margin: 0,
    padding: 0,
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
