// import axios from 'axios'

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
  // let res;
  try {
    // res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
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
      return {};
    default:
      return state;
  }
}