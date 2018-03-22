import firebase from 'react-native-firebase';


const parseUserNumber = (number) => {
	if(number.substring(0, 2) === '+1') {
    	return number.substring(2, number.length);
    }
    return number;
}

const getActiveCalls = (database, callBack) => {
  const user = firebase.auth().currentUser;
  database.ref('userCalls/' + parseUserNumber(user.phoneNumber)).orderByChild('key').on('value', function(snapshot) {
    if(snapshot.val()){
      callBack(snapshot.val());
    }
  });
}

const saveUserAccount = (displayName, phoneNumber, photoURL, success, failure) => {
	console.log("HERE")
	const user = firebase.auth().currentUser;
	user.updateProfile({
	  displayName: displayName,
	  photoURL: photoURL,
	}).then(function() {
	console.log("YE")
	  // Update successful.
	  success();
	}).catch(function(error) {
	  // An error happened.
	  console.log("NO")
	  failure();  
	});
	console.log("DOING THIS")
	firebase.database().ref('users/' + parseUserNumber(phoneNumber)).set({
		displayName: displayName,
		photoURL: photoURL,
	})
}

const createCall = (callName, contacts, callback) => {
	const user = firebase.auth().currentUser;
    let userPhonenumber = parseUserNumber(user.phoneNumber);
    const database = firebase.database();
    let selectedContacts = contacts.filter((item) => item.selected).map((item) => item.number);
    selectedContacts.push(userPhonenumber);
    const callsRef = database.ref('calls').push();
    const usersRef = database.ref('userCalls');
    const startedAt = firebase.database.ServerValue.TIMESTAMP;
    callsRef.set({
      title: callName,
      creator: user.displayName,
      active: true,
      startedAt: startedAt,
      members: selectedContacts,
    });
    selectedContacts.map((number) => {
    	usersRef.child(number).child(callsRef.key).set({
    		key: callsRef.key,
			title: callName,
			creator: user.displayName,
			active: true,
			startedAt: startedAt,
    	})
    })
    callback();
}

const getUserByNumber = (number, callback) => {
	const database = firebase.database();
	database.ref('users').child(number).once('value').then((snapshot) => {
		callback(snapshot.val());
	});
}

const getMembersInCall = (key, callback) => {
	const database = firebase.database();
	database.ref('calls').child(key).once('value').then((snapshot) => {
		callback(snapshot.val());
	});
}

const getMemberDetailsInCall = (members, callback) => {
	const database = firebase.database();
	members.map((num) => {
		database.ref('users').child(num).once('value').then((snapshot) => {
			callback(num, snapshot.val());
		});
	})
}

const FirebaseUtils = {
	getActiveCalls,
	saveUserAccount,
	createCall,
	getUserByNumber,
	getMembersInCall,
	getMemberDetailsInCall,
}

export default FirebaseUtils;
