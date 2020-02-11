import axios from "axios";

const initialState = {
  screenMinsToday: 0,
  screenHoursThisMonth: 0,
  screenHoursThisYear: 0,
  screenMinsYesterday: 0,
  screenHoursWeek: 0,
  threeHourSnapCount: 0
};

// ACTION TYPES
const GOT_TODAYS_SCREENTIME = "GOT_TODAYS_SCREENTIME";
const GOT_MONTHS_SCREENTIME = "GOT_MONTHS_SCREENTIME";
const GOT_YEARS_SCREENTIME = "GOT_YEARS_SCREENTIME";
const GOT_YESTERDAYS_SCREENTIME = "GOT_YESTERDAYS_SCREENTIME";
const GOT_WEEKS_SCREENTIME = "GOT_WEEKS_SCREENTIME";
const GOT_THREE_HOUR_SNAP_COUNT = "GOT_THREE_HOUR_SNAP_COUNT";

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

export const gotYesterdaysScreenTime = screenMinsYesterday => {
  return {
    type: GOT_YESTERDAYS_SCREENTIME,
    screenMinsYesterday
  };
};

export const gotWeeksScreenTime = screenHoursWeek => {
  return {
    type: GOT_WEEKS_SCREENTIME,
    screenHoursWeek
  };
};

export const gotThreeHoursnapCount = threeHourSnapCount => {
  return {
    type: GOT_THREE_HOUR_SNAP_COUNT,
    threeHourSnapCount
  };
};

// THUNKY THUNKS
export const getTodaysScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/weightedScore/${userId}/today`);
      dispatch(gotTodaysScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getMonthsScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/weightedScore/${userId}/month`);
      dispatch(gotMonthsScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getYearsScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/weightedScore/${userId}/year`);
      dispatch(gotYearsScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getYesterdaysScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(
        `/api/weightedScore/${userId}/yesterday`
      );
      dispatch(gotYesterdaysScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getWeeksScreenTime = userId => {
  return async dispatch => {
    try {
      const screenTime = await axios.get(`/api/weightedScore/${userId}/week`);
      dispatch(gotWeeksScreenTime(screenTime.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getThreeHourSnapCount = userId => {
  return async dispatch => {
    try {
      const snapCount = await axios.get(
        `/api/weightedScore/${userId}/threeHours`
      );
      dispatch(gotThreeHoursnapCount(snapCount.data));
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
    case GOT_YESTERDAYS_SCREENTIME:
      return {
        ...state,
        screenMinsYesterday: action.screenMinsYesterday
      };
    case GOT_WEEKS_SCREENTIME:
      return {
        ...state,
        screenHoursWeek: action.screenHoursWeek
      };
    case GOT_THREE_HOUR_SNAP_COUNT:
      return {
        ...state,
        threeHourSnapCount: action.threeHourSnapCount
      };
    default:
      return state;
  }
};

export default timeReducer;
