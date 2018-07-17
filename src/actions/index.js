import firebase from 'firebase';
import _ from 'lodash';


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

export const createNewContact = ({avatarUri, first_name, last_name, phone, email, company, instagram, linkedin,
   facebook, twitter, project, notes}) => {
    console.log('in createNewContact');
    const {currentUser} = firebase.auth();
    console.log('after firebase auth');
    const uid = currentUser.uid;

    ///

    const data = {avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter,
       project, notes, created_by: currentUser.uid}
    data[uid] = true;
    // add a new user: data[new_user_uid] = true;
    return(dispatch) => {
      console.log('before data push');
      const newContactRef = firebase.database().ref(`contacts`).push(data);

      newContactRef.then(function() {
        console.log('Success callback for firebase');
        dispatch({type: 'NEW_CONTACT', payload: {...data, uid: newContactRef.key}});
      })
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


const filterPeople = (oldPeople, searchTerm) => {
  const filteredList = _.filter(oldPeople, (person) => {
    const fullName = `${person.first_name} ${person.last_name}`
    return fullName.indexOf(searchTerm) > -1;
  })
  return filteredList;
};

export const loadFilteredContacts = (searchTerm) => {
  console.log('in loadInitialContacts');
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    console.log('in dispatch for LIC. current user uid: ' + currentUser.uid);
    firebase.database().ref(`contacts`).orderByChild(currentUser.uid)
    .once('value', (snapshot) => {
      console.log('got value after LIC');
      dispatch({type: 'INITIAL_FETCH', payload: filterPeople(snapshot.val(), searchTerm)});
    });
  };
};


export const deleteContact = (uid) => {
  const {currentUser} = firebase.auth();
  return(dispatch) => {
    firebase.database().ref(`contacts/${uid}`)
    .remove()
    .then(() => {
      dispatch({type: 'DELETE_CONTACT', payload: uid});
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

/////

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

export const filterList = (searchTerm) => {
  return {
    type: 'FILTER_CONTACT',
    payload: searchTerm,
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

export const addPhoto = (uri) => {
  return {
    type: 'ADD_PHOTO',
    payload: uri,
  };
}
