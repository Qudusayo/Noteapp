import { FETCH_NOTES, FETCH_NOTE, NEW_NOTE, EDIT_NOTE, DELETE_NOTE, NEW_USER, FETCH_USERS, CHECK_USER, REAL_USER, GET_USER } from './types';

export const editNote = data => dispatch => {
  fetch('http://localhost:4500/editNote', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(newnote =>
      dispatch({
        type: EDIT_NOTE,
        payload: newnote
      })
    )
};

export const newUser = data => dispatch => {
  fetch('http://localhost:4500/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: NEW_USER,
        payload: user
      })
    )
};

export const userInfo = data => dispatch => {
  fetch('http://localhost:4500/userInfo', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(info =>
      dispatch({
        type: GET_USER,
        payload: info
      })
    )
};

export const checkuser = () => dispatch => {
  fetch('http://localhost:4500/checkuser', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(users =>
      dispatch({
        type: CHECK_USER,
        payload: users
      })
    )
};

export const real = (data) => dispatch => {
  dispatch({
    type: REAL_USER,
    payload: data
  })
}

export const allUsers = () => dispatch => {
  fetch('http://localhost:4500/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users
      })
    )
};

export const insertNote = data => dispatch => {
  fetch('http://localhost:4500/insertNote', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(newnote =>
      dispatch({
        type: NEW_NOTE,
        payload: newnote
      })

    )
};

export const deleteNote = data => dispatch => {
  fetch('http://localhost:4500/delNote', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(note =>
      dispatch({
        type: DELETE_NOTE,
        payload: note
      })
    );
};

export const findNote = data => dispatch => {
  fetch('http://localhost:4500/findNote', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(note =>
      dispatch({
        type: FETCH_NOTE,
        payload: note
      })
    );
};

export const getNotes = postData => dispatch => {
  dispatch({
    type: FETCH_NOTES,
    payload: postData
  })
};
