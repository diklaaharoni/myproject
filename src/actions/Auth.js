import firebase from 'firebase';

export const login = (email, password, onAuthSuccess, onAuthFailed, onStart) => {
  onStart();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(onAuthSuccess())
  .catch(() => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(onAuthSuccess())
    .catch(onAuthFailed());
  });
}

export const logout = () => {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
}
