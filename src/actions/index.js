import firebase from 'firebase';


export const selectPerson = (peopleId) => {
    return {
        type: 'SELECTED_PERSON',
        payload: peopleId,
    };
};

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: {prop, value},
    };
};

export const createNewContact = ({first_name, last_name, phone, email, company, project, notes}) => {
    console.log('in createNewContact');
    const {currentUser} = firebase.auth();
    const uid = currentUser.uid;

    const data = {first_name, last_name, phone, email, company, project, notes}
    data[uid] = true;
    // add a new user: data[new_user_uid] = true;
    return(dispatch) => {
      firebase.database().ref(`/people`)
      .push(data)
      .then(() => {
        console.log('Success callback for firebase');
        dispatch({type: 'NEW_CONTACT'});
      });
    };
};

export const loadInitialContacts = () => {
  console.log('in loadInitialContacts');
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    console.log('in dispatch for LIC');
    firebase.database().ref(`people`).orderByChild(currentUser.uid).equalTo(true)
    .once('value', (snapshot) => {
      console.log('got value after LIC');
      dispatch({type: 'INITIAL_FETCH', payload: snapshot.val()});
    });
  };
};


export const deleteContact = (uid) => {
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    firebase.database().ref(`/people/${uid}`)
    .remove()
    .then(() => {
      dispatch({type: 'DELETE_CONTACT'});
    });
  };
}

export const updateContact = (personSelected) => {
  return {
    type: 'UPDATE_CONTACT',
    payload: personSelected,
  };
};

export const saveContact = ({first_name, last_name, phone, email, company, project, notes, uid}) => {
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    firebase.database().ref(`/people/${uid}`)
    .set({first_name, last_name, phone, email, company, project, notes, uid})
    .then(() => {
      dispatch({type: 'SAVE_CONTACT'});
    });
  };
};

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
    // An error happened.
  });
}
