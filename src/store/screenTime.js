import axios from "axios";

const initialState = {
  screenMinsToday: 0,
  screenHoursThisMonth: 0,
  screenHoursThisYear: 0
};

// ACTION TYPES
const GOT_TODAYS_SCREENTIME = "GOT_TODAYS_SCREENTIME";
const GOT_MONTHS_SCREENTIME = "GOT_TODAYS_SCREENTIME";
const GOT_YEARS_SCREENTIME = "GOT_YEARS_SCREENTIME";

// ACTION CREATORS
export const gotTodaysScreenTime = screenMinsToday => {
  return {
    type: GOT_TODAYS_SCREENTIME,
    screenMinsToday
  };
};

export const gotMonthsScreenTime = screenHoursThisMonth => {
  return {
    type: GOT_MONTHS_SCREENTIME,
    screenHoursThisMonth
  };
};

export const gotYearsScreenTime = screenHoursThisYear => {
  return {
    type: GOT_YEARS_SCREENTIME,
    screenHoursThisYear
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

export const getMonthsScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/hours/${userId}/month`);
      dispatch(gotMonthsScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getYearsScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/hours/${userId}/year`);
      dispatch(gotYearsScreenTime(screenTime.data));
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
    case GOT_MONTHS_SCREENTIME:
      return {
        ...state,
        screenHoursThisMonth: action.screenHoursThisMonth
      };
    case GOT_YEARS_SCREENTIME:
      return {
        ...state,
        screenHoursThisYear: action.screenHoursThisYear
      };
    default:
      return state;
  }
};

export default timeReducer;
