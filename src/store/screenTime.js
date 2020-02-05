import axios from "axios";

const initialState = {
  screenMinsToday: 0
};

// ACTION TYPES
const GOT_TODAYS_SCREENTIME = "GOT_TODAYS_SCREENTIME";

// ACTION CREATORS
export const gotTodaysScreenTime = screenMinsToday => {
  return {
    type: GOT_TODAYS_SCREENTIME,
    screenMinsToday
  };
};

// THUNKY THUNKS
export const getTodaysScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/hours/${userId}/today`);
      dispatch(gotTodaysScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TODAYS_SCREENTIME:
      return {
        ...state,
        screenMinsToday: action.screenMinsToday
      };
    default:
      return state;
  }
};

export default timeReducer;
