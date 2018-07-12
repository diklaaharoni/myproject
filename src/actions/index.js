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

export const createNewContact = ({first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes}) => {
    console.log('in createNewContact');
    const {currentUser} = firebase.auth();
    console.log('after firebase auth');
    const uid = currentUser.uid;

    const data = {first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes, created_by: currentUser.uid}
    data[uid] = true;
    // add a new user: data[new_user_uid] = true;
    return(dispatch) => {
      console.log('before data push');
      firebase.database().ref(`contacts`)
      .push(data, function() {
        console.log('Success callback for firebase');
        dispatch({type: 'NEW_CONTACT'});
      });
    };
};

export const loadInitialContacts = () => {
  console.log('in loadInitialContacts');
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    console.log('in dispatch for LIC. current user uid: ' + currentUser.uid);
    firebase.database().ref(`contacts`).orderByChild(currentUser.uid)
    .once('value', (snapshot) => {
      console.log('got value after LIC');
      dispatch({type: 'INITIAL_FETCH', payload: snapshot.val()});
    });
  };
};


export const deleteContact = (uid) => {
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    firebase.database().ref(`contacts/${uid}`)
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

export const saveContact = (contact) => {
  const {currentUser} = firebase.auth();
  contact.created_by = currentUser.uid;
  return(dispatch) => {
    console.log(`before update: ${contact.uid}`);
    firebase.database().ref(`contacts/${contact.uid}`)
    .set(contact)
    .then(() => {
      console.log(`after update: ${contact.uid}`);
      dispatch({type: 'SAVE_CONTACT', payload: contact});
    }).catch(error => {
      console.log(error)
      dispatch({type: 'PERMISSIONS_DENIED'});
    });
  };
};

export const login = (email, password, onAuthSuccess, onAuthFailed, onStart) => {
  onStart();
  console.log(email);
  console.log(password);
  firebase.auth().signInWithEmailAndPassword(email, password)
  //firebase.auth().signInWithEmailAndPassword("dikla@gmail.com", "password1")
  .then(() => {
    console.log("success");
    onAuthSuccess()
  })

  .catch(() => {
    console.log("fail");
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
