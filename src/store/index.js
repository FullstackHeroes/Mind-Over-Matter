import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const initialState = {
  user: {}
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //going to need some async here
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    //going to need some async here
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr); //this is just a fancy way to label the error
  }
};

export const logout = () => async dispatch => {
  try {
    //going to need some async here
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
const reducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  // applyMiddleware(thunkMiddleware) //toggle between if logger takes up to much space!
);

const store = createStore(reducer, middleware);

export default store;
