import _ from 'lodash';


const initialState = {
    people: [],
    detailView: false,
    searchTerm: '',
    personSelected: null,
    companyUri: '',
    avatarUri: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    company: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    job_description: '',
    notes: '',
    toUpdate: false,
};

const updatePeople = (oldPeople, updatedContact) => {
  const updatedPeople = {...oldPeople}
  updatedPeople[updatedContact.uid] = updatedContact;
  return updatedPeople;
};

const addPeople = (oldPeople, newContact) => {
  console.log(oldPeople, newContact);
  return { ...oldPeople, [newContact.uid]: newContact };
};

const deletePeople = (oldPeople, uid) => {
  const updatedPeople = {...oldPeople}
  delete updatedPeople[uid];
  return updatedPeople;
};

const filterPeople = (oldPeople, searchTerm) => {
  const filteredList = _.filter(oldPeople, (person) => {
    const fullName = `${person.first_name} ${person.last_name}`
    return fullName.indexOf(searchTerm) > -1;
  })
  return filteredList;
};




export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':
        console.log(action.payload);
            return {
              ...state,
              people: action.payload.snapshots,
              userId: action.payload.userId
            }

        case 'SELECTED_PERSON':
            return {
                ...state,
                detailView: true,
                personSelected: action.payload,
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                personSelected: null,
            }

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
            }

        case 'NEW_CONTACT':
        console.log(action);

            return {
                ...state,
                companyUri: '',
                avatarUri: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                job_description: '',
                notes: '',
                detailView: false,
                people: addPeople(state.people, action.payload)
            }

        case 'ADD_PERSON':
            return {
                ...state,
                ...action.newPerson,

            }

        case 'UPDATE_CONTACT':
            return {
                ...state,
                toUpdate: true,
                companyUri: action.payload.companyUri,
                avatarUri: action.payload.avatarUri,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                phone: action.payload.phone,
                email: action.payload.email,
                company: action.payload.company,
                instagram: action.payload.instagram,
                linkedin: action.payload.linkedin,
                facebook: action.payload.facebook,
                twitter: action.payload.twitter,
                job_description: action.payload.job_description,
                notes: action.payload.notes,
                uid: action.payload.uid,
            }

        case 'SAVE_CONTACT':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                companyUri: '',
                avatarUri: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                job_description: '',
                notes: '',
                uid: '',
                people: updatePeople(state.people, action.payload)
        }

        case 'PERMISSIONS_DENIED':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                companyUri: '',
                avatarUri: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                job_description: '',
                notes: '',
                uid: '',
        }

        case 'DELETE_CONTACT':
            return {
                ...state,
                detailView: false,
                personSelected: null,
                people: deletePeople(state.people, action.payload)
        }

        case 'FILTER_CONTACT':
        console.log(action.payload);
            return {
                ...state,
                detailView: false,
                personSelected: null,
                people: filterPeople(state.people, action.payload)
        }

        case 'ADD_PHOTO':
          return {
            ...state,
            avatarUri: action.payload
          }

          case 'ADD_COMPANY_PHOTO':
            return {
              ...state,
              companyUri: action.payload,
            }

        default:
            return state;
    }
}
