import { NEW_USER, FETCH_NOTES, FETCH_NOTE, NEW_NOTE, DELETE_NOTE, EDIT_NOTE, FETCH_USERS, CHECK_USER, REAL_USER, GET_USER } from '../actions/types';

const initialState = {
  note: {},
  auth: false,
  userinfo: {
    username: '',
    password: '',
    notes: [],
    notesNum: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
      };
    case GET_USER:
      return {
        ...state,
        userinfo: action.payload
      };
    case CHECK_USER:
      return {
        ...state,
        checkuser: action.payload
      };
    case REAL_USER:
      return {
        ...state,
        auth: action.payload
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case FETCH_NOTES:
      return {
        ...state,
        login: action.payload
      };
    case FETCH_NOTE:
      return {
        ...state,
        note: action.payload
      };
    case DELETE_NOTE:
      return {
        ...state,
      };
    case NEW_NOTE:
      return {
        ...state,
      };
    case EDIT_NOTE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
