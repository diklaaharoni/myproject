
const initialState = {
    people: [],
    detailView: false,
    personSelected: null,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    company: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    project: '',
    notes: '',
    toUpdate: false,
};

const updatePeople = (oldPeople, updatedContact) => {
  const updatedPeople = {...oldPeople}
  updatedPeople[updatedContact.uid] = updatedContact;
  return updatedPeople;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':
            return {
              ...state,
              people: action.payload,
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
            return {
                ...state,
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                project: '',
                notes: '',
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
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                phone: action.payload.phone,
                email: action.payload.email,
                company: action.payload.company,
                instagram: action.payload.instagram,
                linkedin: action.payload.linkedin,
                facebook: action.payload.facebook,
                twitter: action.payload.twitter,
                project: action.payload.project,
                notes: action.payload.notes,
                uid: action.payload.uid,
            }

        case 'SAVE_CONTACT':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                project: '',
                notes: '',
                uid: '',
                people: updatePeople(state.people, action.payload)
        }
        case 'PERMISSIONS_DENIED':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                company: '',
                instagram: '',
                linkedin: '',
                facebook: '',
                twitter: '',
                project: '',
                notes: '',
                uid: '',
        }

        case 'DELETE_CONTACT':
            return {
                ...state,
                detailView: false,
                personSelected: null,
        }

        default:
            return state;
    }
}
