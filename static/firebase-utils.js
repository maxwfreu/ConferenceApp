import firebase from 'react-native-firebase';

const getActiveCalls = (database, callBack) => {
  const userId = firebase.auth().currentUser.uid;
  database.ref('userCalls/' + userId).orderByChild('key').on('value', function(snapshot) {
    if(snapshot.val()){
      callBack(snapshot.val());
    }
  });
}

module.exports = {
  getActiveCalls,
}
