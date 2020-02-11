import axios from "axios";
import {
  calcNormalizeUtility,
  calcWeightedTrueScore,
  snapIntDefault,
  dbIntDefault,
  calcSentimentDiff
} from "../utils/utilities";

// INITIAL STATE
const initialState = {
  snapInterval: 0,
  dbInterval: 0,
  fullScoreObj: [],
  normalizedScore: [],
  runningScore: [],
  sentimentDiff: [],
  currentRunningSentiment: null,
  threeHourSnapCount: 0,
  screenMinsToday: 0,
  screenMinsYesterday: 0,
  screenHoursWeek: 0
};

// ACTION TYPES
const GET_TIME_INTERVAL = "GET_TIME_INTERVAL";
const GET_FULL_SCORE_OBJ = "GET_FULL_SCORE_OBJ";
const GET_NORMALIZED_SCORE = "GET_NORMALIZED_SCORE";
const GET_RUNNING_SCORE = "GET_RUNNING_SCORE";
const GET_SENTIMENT_DIFF = "GET_SENTIMENT_DIFF";
const GET_CURRENT_RUNNING_SENTIMENT = "GET_CURRENT_RUNNING_SENTIMENT";
const GOT_THREE_HOUR_SNAP_COUNT = "GOT_THREE_HOUR_SNAP_COUNT";
const GOT_TODAYS_SCREENTIME = "GOT_TODAYS_SCREENTIME";
const GOT_YESTERDAYS_SCREENTIME = "GOT_YESTERDAYS_SCREENTIME";
const GOT_WEEKS_SCREENTIME = "GOT_WEEKS_SCREENTIME";

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

export const getCurrentRunningSentiment = runningSentiment => {
  return {
    type: GET_CURRENT_RUNNING_SENTIMENT,
    runningSentiment
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

// THUNKY THUNKS
export const setFullScoreObj = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/weightedScore/${userId}`),
        {
          userWtdObj,
          normalizeScoreArr,
          runningScoreArr,
          sentimentDiffArr,
          threeHourSnapCount,
          screenMinsToday,
          screenMinsYesterday,
          screenHoursWeek
        } = data;

      if (userWtdObj.length) {
        dispatch(getFullScoreObj(userWtdObj));
        dispatch(getNormalizedScore(normalizeScoreArr));
        dispatch(getRunningScore(runningScoreArr));
        dispatch(getSentimentDiff(sentimentDiffArr));
        dispatch(gotThreeHoursnapCount(threeHourSnapCount));
        dispatch(gotTodaysScreenTime(screenMinsToday));
        dispatch(gotYesterdaysScreenTime(screenMinsYesterday));
        dispatch(gotWeeksScreenTime(screenHoursWeek));
      } else dispatch(getFullScoreObj([]));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postFullScoreObj = (fullScoreObj, newScoreObj) => {
  return async dispatch => {
    try {
      // CALCULATING NORMALIZE AND RUNNING SCORE WITH UTILITY FUNCTIONS
      const normalizeScore = calcNormalizeUtility(fullScoreObj),
        runningScore = calcWeightedTrueScore(fullScoreObj);

      // APPENDING NEW SCORES ONTO OBJECT FOR DB
      newScoreObj.normalizeScore = normalizeScore;
      newScoreObj.runningScore = runningScore;
      newScoreObj.sentimentDiff = calcSentimentDiff(
        runningScore,
        normalizeScore
      );

      const { data } = await axios.post(`/api/weightedScore`, newScoreObj),
        {
          userWtdObj,
          normalizeScoreArr,
          runningScoreArr,
          sentimentDiffArr,
          threeHourSnapCount,
          screenMinsToday,
          screenMinsYesterday,
          screenHoursWeek
        } = data;

      dispatch(getFullScoreObj(userWtdObj));
      dispatch(getNormalizedScore(normalizeScoreArr));
      dispatch(getRunningScore(runningScoreArr));
      dispatch(getSentimentDiff(sentimentDiffArr));
      dispatch(gotThreeHoursnapCount(threeHourSnapCount));
      dispatch(gotTodaysScreenTime(screenMinsToday));
      dispatch(gotYesterdaysScreenTime(screenMinsYesterday));
      dispatch(gotWeeksScreenTime(screenHoursWeek));
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
    case GET_CURRENT_RUNNING_SENTIMENT:
      return { ...state, currentRunningSentiment: action.runningSentiment };
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
    default:
      return state;
  }
};

export default scoreReducer;
