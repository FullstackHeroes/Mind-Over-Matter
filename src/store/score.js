import axios from "axios";
import {
  condenseScoreObj,
  calcNormalizeUtility,
  calcWeightedTrueScore,
  dateCreate,
  snapIntDefault,
  dbIntDefault
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
      const LSDataExtract = JSON.parse(localStorage.getItem("snapshots")),
        targetLSDataObj =
          LSDataExtract && LSDataExtract.length
            ? LSDataExtract.filter(snap => snap.userId === userId)
            : [];

      const { data } = await axios.get(`/api/weightedScore/${userId}`),
        {
          userWtdObj,
          threeHourSnapCount,
          screenMinsToday,
          screenMinsYesterday,
          screenHoursWeek
        } = data,
        adjFullScoreObj = userWtdObj.concat(targetLSDataObj);
      // const { data: dbScoreObj } = await axios.get(
      //     `/api/weightedScore/${userId}`
      //   ),
      //   adjFullScoreObj = dbScoreObj.concat(targetLSDataObj);

      console.log(
        "TEST -",
        adjFullScoreObj,
        threeHourSnapCount,
        screenMinsToday,
        screenMinsYesterday,
        screenHoursWeek
      );

      if (adjFullScoreObj.length) {
        dispatch(getFullScoreObj(adjFullScoreObj));
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

export const postLSScoreObj = userId => {
  return async dispatch => {
    try {
      // ADJUSTING LS SCORE OBJ FOR BACKEND DIGESTION
      const LSDataObj = JSON.parse(localStorage.getItem("snapshots")),
        targetLSDataObj = LSDataObj.filter(snap => snap.userId === userId),
        adjLSDataObj = condenseScoreObj(targetLSDataObj, userId),
        hoursDiff =
          adjLSDataObj.timeStamp.getHours() -
          adjLSDataObj.timeStamp.getTimezoneOffset() / 60;
      adjLSDataObj.timeStamp.setHours(hoursDiff);

      // INTERACT WITH DATABASE
      const newWtdScore = await axios.post("/api/weightedScore", adjLSDataObj);

      dispatch(getFullScoreObj(newWtdScore.data));
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNormalizedScore = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/normalizeScore/${userId}`),
        { normalizeScoreArr, runningScoreArr, sentimentDiffArr } = data;
      dispatch(getNormalizedScore(normalizeScoreArr));
      dispatch(getRunningScore(runningScoreArr));
      dispatch(getSentimentDiff(sentimentDiffArr));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postNormalizedScore = userId => {
  return async dispatch => {
    try {
      const normalizeScore = await calcNormalizeUtility(userId),
        runningScore = await calcWeightedTrueScore(userId),
        timeStamp = dateCreate(),
        hoursDiff = timeStamp.getHours() - timeStamp.getTimezoneOffset() / 60;
      timeStamp.setHours(hoursDiff);
      const { data } = await axios.post(`/api/normalizeScore`, {
          userId,
          normalizeScore,
          runningScore,
          sentimentDiff: runningScore / normalizeScore,
          timeStamp
        }),
        { normalizeScoreArr, runningScoreArr, sentimentDiffArr } = data;
      dispatch(getNormalizedScore(normalizeScoreArr));
      dispatch(getRunningScore(runningScoreArr));
      dispatch(getSentimentDiff(sentimentDiffArr));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postCurrentRunningSentiment = sentimentScore => {
  return dispatch => {
    try {
      dispatch(getCurrentRunningSentiment(sentimentScore));
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
