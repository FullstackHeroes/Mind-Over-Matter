import axios from "axios";
import history from "../history";
import { condenseScoreObj } from "../utils/utilities";

// INITIAL STATE
const defaultUser = {};

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

// THUNKY THUNKS
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = userObj => async dispatch => {
  let res;
  try {
    const { formName } = userObj;
    res = await axios.post(`/auth/${formName}`, userObj);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/Dashboard");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = userId => async dispatch => {
  try {
    const LSDataObj = JSON.parse(localStorage.getItem("snapshots"));
    if (LSDataObj && LSDataObj.length) {
      const targetLSDataObj = LSDataObj.filter(snap => snap.userId === userId),
        adjLSDataObj = condenseScoreObj(targetLSDataObj, userId),
        hoursDiff =
          adjLSDataObj.timeStamp.getHours() -
          adjLSDataObj.timeStamp.getTimezoneOffset() / 60;
      adjLSDataObj.timeStamp.setHours(hoursDiff);
      console.log("POSTING LS -", adjLSDataObj);
      await axios.post("/auth/logout", adjLSDataObj);
    } else await axios.post("/auth/logout");

    dispatch(removeUser());
    localStorage.clear();
    history.push("/SignIn");
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
