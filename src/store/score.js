import axios from "axios";
import {
  calcNormalizeUtility,
  calcWeightedTrueScore,
  snapIntDefault,
  dbIntDefault,
  calcSentimentDiff,
  buildIndScoreObj
} from "../utils/utilities";

// INITIAL STATE
const initialState = {
  snapInterval: 0,
  dbInterval: 0,
  fullScoreObj: [],
  normalizedScore: [],
  runningScore: [],
  sentimentDiff: [],
  threeHourSnapCount: 0,
  screenMinsToday: 0,
  screenMinsYesterday: 0,
  screenHoursWeek: 0,
  detected: false
};

// ACTION TYPES
const GET_TIME_INTERVAL = "GET_TIME_INTERVAL";
const GET_FULL_SCORE_OBJ = "GET_FULL_SCORE_OBJ";
const GET_NORMALIZED_SCORE = "GET_NORMALIZED_SCORE";
const GET_RUNNING_SCORE = "GET_RUNNING_SCORE";
const GET_SENTIMENT_DIFF = "GET_SENTIMENT_DIFF";
const GOT_THREE_HOUR_SNAP_COUNT = "GOT_THREE_HOUR_SNAP_COUNT";
const GOT_TODAYS_SCREENTIME = "GOT_TODAYS_SCREENTIME";
const GOT_YESTERDAYS_SCREENTIME = "GOT_YESTERDAYS_SCREENTIME";
const GOT_WEEKS_SCREENTIME = "GOT_WEEKS_SCREENTIME";
const ADD_FULL_SCORE_OBJ = "ADD_FULL_SCORE_OBJ";
const ADD_NORMALIZED_SCORE = "ADD_NORMALIZED_SCORE";
const ADD_RUNNING_SCORE = "ADD_RUNNING_SCORE";
const ADD_SENTIMENT_DIFF = "ADD_SENTIMENT_DIFF";
const UPDATE_DETECTION = "UPDATE_DETECTION";
const UPDATE_ALL = "UPDATE_ALL";

// ACTION CREATORS
export const getTimeInterval = (
  snapInterval = snapIntDefault,
  dbInterval = dbIntDefault
) => {
  return {
    type: GET_TIME_INTERVAL,
    snapInterval,
    dbInterval
  };
};

export const getFullScoreObj = fullScoreObj => {
  return {
    type: GET_FULL_SCORE_OBJ,
    fullScoreObj
  };
};

export const getNormalizedScore = normalizedScore => {
  return {
    type: GET_NORMALIZED_SCORE,
    normalizedScore
  };
};

export const getRunningScore = runningScore => {
  return {
    type: GET_RUNNING_SCORE,
    runningScore
  };
};

export const getSentimentDiff = sentimentDiff => {
  return {
    type: GET_SENTIMENT_DIFF,
    sentimentDiff
  };
};

export const gotThreeHoursnapCount = threeHourSnapCount => {
  return {
    type: GOT_THREE_HOUR_SNAP_COUNT,
    threeHourSnapCount
  };
};

export const gotTodaysScreenTime = screenMinsToday => {
  return {
    type: GOT_TODAYS_SCREENTIME,
    screenMinsToday
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

export const addFullScoreObj = fullScoreObj => {
  return {
    type: ADD_FULL_SCORE_OBJ,
    fullScoreObj
  };
};

export const addNormalizedScore = normalizedScore => {
  return {
    type: ADD_NORMALIZED_SCORE,
    normalizedScore
  };
};

export const addRunningScore = runningScore => {
  return {
    type: ADD_RUNNING_SCORE,
    runningScore
  };
};

export const addSentimentDiff = sentimentDiff => {
  return {
    type: ADD_SENTIMENT_DIFF,
    sentimentDiff
  };
};

export const updateDetection = () => {
  return {
    type: UPDATE_DETECTION
  };
};

export const updateAll = AllObj => {
  const {
    fullScoreObj,
    normalizeScoreArr,
    runningScoreArr,
    sentimentDiffArr,
    threeHourSnapCount,
    screenMinsToday,
    screenMinsYesterday,
    screenHoursWeek,
    detected
  } = AllObj;
  return {
    type: UPDATE_ALL,
    fullScoreObj,
    normalizeScoreArr,
    runningScoreArr,
    sentimentDiffArr,
    threeHourSnapCount,
    screenMinsToday,
    screenMinsYesterday,
    screenHoursWeek,
    detected
  };
};

// THUNKY THUNKS
export const noDetection = () => {
  return dispatch => {
    dispatch(updateDetection());
  };
};

export const setFullScoreObj = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/weightedScore/${userId}`),
        {
          fullScoreObj,
          normalizeScoreArr,
          runningScoreArr,
          sentimentDiffArr,
          threeHourSnapCount,
          screenMinsToday,
          screenMinsYesterday,
          screenHoursWeek
        } = data;

      if (fullScoreObj.length) {
        dispatch(
          updateAll({
            fullScoreObj,
            normalizeScoreArr,
            runningScoreArr,
            sentimentDiffArr,
            threeHourSnapCount,
            screenMinsToday,
            screenMinsYesterday,
            screenHoursWeek,
            detected: false
          })
        );
      } else dispatch(getFullScoreObj([]));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postFullScoreObj = (oldFullScoreObj, newScoreObj) => {
  return async dispatch => {
    try {
      // CALCULATING NORMALIZE AND RUNNING SCORE WITH UTILITY FUNCTIONS
      const normalizeScore = calcNormalizeUtility(oldFullScoreObj),
        runningScore = calcWeightedTrueScore(oldFullScoreObj),
        sentimentDiff = calcSentimentDiff(runningScore, normalizeScore);

      // APPENDING NEW SCORES ONTO OBJECT FOR DB
      newScoreObj.normalizeScore = normalizeScore;
      newScoreObj.runningScore = runningScore;
      newScoreObj.sentimentDiff = sentimentDiff;

      await axios.post(`/api/weightedScore`, newScoreObj);

      newScoreObj.timeStamp = newScoreObj.timeStamp.toISOString();
      const fullScoreObj = oldFullScoreObj.slice().reverse();
      fullScoreObj.push(newScoreObj);

      const {
        normalizeScoreArr,
        runningScoreArr,
        sentimentDiffArr,
        threeHourSnapCount,
        screenMinsToday,
        screenMinsYesterday,
        screenHoursWeek
      } = buildIndScoreObj(fullScoreObj);

      dispatch(
        updateAll({
          fullScoreObj,
          normalizeScoreArr,
          runningScoreArr,
          sentimentDiffArr,
          threeHourSnapCount,
          screenMinsToday,
          screenMinsYesterday,
          screenHoursWeek,
          detected: true
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIME_INTERVAL:
      return {
        ...state,
        snapInterval: action.snapInterval,
        dbInterval: action.dbInterval
      };
    case GET_FULL_SCORE_OBJ:
      return { ...state, fullScoreObj: action.fullScoreObj };
    case GET_NORMALIZED_SCORE:
      return { ...state, normalizedScore: action.normalizedScore };
    case GET_RUNNING_SCORE:
      return { ...state, runningScore: action.runningScore };
    case GET_SENTIMENT_DIFF:
      return { ...state, sentimentDiff: action.sentimentDiff };
    case GOT_THREE_HOUR_SNAP_COUNT:
      return {
        ...state,
        threeHourSnapCount: action.threeHourSnapCount
      };
    case GOT_TODAYS_SCREENTIME:
      return {
        ...state,
        screenMinsToday: action.screenMinsToday
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
    case ADD_FULL_SCORE_OBJ:
      return {
        ...state,
        fullScoreObj: [...state.fullScoreObj, action.fullScoreObj]
      };
    case ADD_NORMALIZED_SCORE:
      return {
        ...state,
        normalizedScore: [...state.normalizedScore, action.normalizedScore]
      };
    case ADD_RUNNING_SCORE:
      return {
        ...state,
        runningScore: [...state.runningScore, action.runningScore]
      };
    case ADD_SENTIMENT_DIFF:
      return {
        ...state,
        sentimentDiff: [...state.sentimentDiff, action.sentimentDiff]
      };
    case UPDATE_DETECTION:
      return {
        ...state,
        detected: false
      };
    case UPDATE_ALL:
      return {
        ...state,
        fullScoreObj: action.fullScoreObj,
        normalizedScore: action.normalizeScoreArr,
        runningScore: action.runningScoreArr,
        sentimentDiff: action.sentimentDiffArr,
        threeHourSnapCount: action.threeHourSnapCount,
        screenMinsToday: action.screenMinsToday,
        screenMinsYesterday: action.screenMinsYesterday,
        screenHoursWeek: action.screenHoursWeek,
        detected: action.detected
      };
    default:
      return state;
  }
};

export default scoreReducer;
