import firebase from 'react-native-firebase';

const getActiveCalls = (database, callBack) => {
  const userId = firebase.auth().currentUser.uid;
  database.ref('userCalls/' + userId).on('value', function(snapshot) {
    if(snapshot.val()){
      fetchCalls(snapshot.val(), database, callBack)
    }
  });
}

const fetchCalls = (callIds, database, callback) => {
  // Map the Firebase promises into an array
  const callObjects = Object.keys(callIds);
  const callPromises = callObjects.map((key, idx) => {
    database.ref('calls/' + callIds[key].key).on('value', function(snapshot) {
      const call = snapshot.val();
      if(call) {
        callback(call)
      }
    });
  });
}

module.exports = {
  getActiveCalls,
}
