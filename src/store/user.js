// import axios from 'axios'

<<<<<<< HEAD
// INITIAL STATE
const initialState = {
  name: ""
};

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
=======
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {
  name: ''
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
>>>>>>> 6133638e09cbf825c7af7a1f23c36861f9156702

// THUNKY THUNKS
export const me = () => async dispatch => {
  try {
    // const res = await axios.get('/auth/me')
    // dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
<<<<<<< HEAD
  // let res;
  try {
    // res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
=======
  let res;
  try {
    // res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}));
>>>>>>> 6133638e09cbf825c7af7a1f23c36861f9156702
  }

  try {
    // dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    // await axios.post('/auth/logout')
    // dispatch(removeUser())
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
<<<<<<< HEAD
      return {};
=======
      return defaultUser;
>>>>>>> 6133638e09cbf825c7af7a1f23c36861f9156702
    default:
      return state;
  }
}
