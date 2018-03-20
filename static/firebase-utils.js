import firebase from 'react-native-firebase';

const getActiveCalls = (database, callBack) => {
  const userId = firebase.auth().currentUser.uid;
  database.ref('userCalls/' + userId).orderByChild('key').on('value', function(snapshot) {
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
	firebase.database().ref('users/' + phoneNumber).set({
		displayName: displayName,
		photoURL: photoURL,
	})
}

module.exports = {
  getActiveCalls,
  saveUserAccount,
}
