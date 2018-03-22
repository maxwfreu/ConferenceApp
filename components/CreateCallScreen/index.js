import React, { Component} from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, FlatList, TouchableHighlight, ActivityIndicator, ListView } from 'react-native';
import { Button, Subheader } from 'react-native-material-ui';
import simpleContacts from 'react-native-simple-contacts';
import * as Animatable from 'react-native-animatable';
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase';
import { StackNavigator, NavigationActions } from 'react-navigation';
import FirebaseUtils from '../../static/firebase-utils';

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
      user: firebase.auth().currentUser,
    }
    this.finishCallCreation = this.finishCallCreation.bind(this);
    this.filterList = this.filterList.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.itemPress = this.itemPress.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
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
    const { callName, contacts } = this.state;
    const that = this;
    FirebaseUtils.createCall(callName, contacts, () => {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Details' })
        ],
      });
      that.props.navigation.dispatch(resetAction);
    });
  }


  filterList(val) {
    let updatedList = this.state.contacts;
    updatedList = updatedList.filter(function(item){
      return (item.number.toLowerCase().search(val.toLowerCase()) !== -1 || item.name.toLowerCase().search(val.toLowerCase()) !== -1);
    });
    this.setState({filteredContacts: updatedList});
  }

  renderListItem({item, index, onPress}) {
    if(item.selected) {
      return (
        <ListItem
          containerStyle={{backgroundColor: 'rgba(10, 160, 217, 0.4)'}}
          title={item.name}
          subtitle={item.number}
          onPress={() => this.itemPress(index)}
        />
      )
    } else {
      return (
        <ListItem
          title={item.name}
          subtitle={item.number}
          onPress={() => this.itemPress(index)}
        />
      );
    }
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
    let filteredContacts = this.state.filteredContacts;
    if(filteredContacts[i].selected){
      filteredContacts[i].selected = false;
    } else {
      filteredContacts[i].selected = true;
    }
    this.setState({
      filteredContacts: filteredContacts,
      flip: !this.state.flip,
    });
  }

  render() {
    const { section, callName, contacts, filteredContacts} = this.state;
    const selectedContacts = contacts.filter((item) => item.selected);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.name !== r2.name});
    const dataSource = ds.cloneWithRows(selectedContacts)
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
            dataSource={dataSource}
            numSelected={selectedContacts.length}
            filterList={this.filterList}
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
            renderListItem={this.renderListItem}
            finish={this.finishCallCreation}
            flip={this.state.flip}
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

const InviteView = (props) => {
  return (
  <Animatable.View style={styles.inviteView} animation="fadeInLeft">
    <List style={styles.flatList}>
      <FlatList
        extraData={props.flip}
        style={styles.flatList}
        data={props.contacts}
        renderItem={(item, index) => props.renderListItem(item, index)}
        ListHeaderComponent={props.renderHeader}
        ListFooterComponent={props.renderFooter}
      />
    </List>
    <View>
      <Text>
        Selected: {props.numSelected}
      </Text>
      <ListView
        horizontal={true}
        dataSource={props.dataSource}
        renderRow={(rowData) => <Text>{rowData.name}, </Text>}
      />
    </View>
    <View style={styles.buttonView}>
      <Button raised primary text="Create" onPress={props.finish} style={{ container: { height: 50} }}/>
    </View>
  </Animatable.View>
  )
};

const styles = StyleSheet.create({
  inviteView: {
    height: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: '#fff',
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
    height: '80%',
    margin: 0,
    padding: 0,
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    marginBottom: 5,
    alignSelf: 'center',
  },
  selectedView: {
    backgroundColor: '#fff',
  }
});
