import axios from "axios";
import {
  condenseScoreObj,
  calcNormalizeUtility,
  calcWeightedTrueScore
} from "../utils/utilities";

// INITIAL STATE
const initialState = {
  snapInterval: 0,
  dbInterval: 0,
  fullScoreObj: [],
  normalizedScore: 0,
  runningScore: 0,
  sentimentDiff: 0
};

// ACTION TYPES
const GET_TIME_INTERVAL = "GET_TIME_INTERVAL";
const GET_FULL_SCORE_OBJ = "GET_FULL_SCORE_OBJ";
const GET_NORMALIZED_SCORE = "GET_NORMALIZED_SCORE";
const GET_RUNNING_SCORE = "GET_RUNNING_SCORE";
const GET_SENTIMENT_DIFF = "GET_SENTIMENT_DIFF";

// ACTION CREATORS
export const getTimeInterval = (snapInterval = 3000, dbInterval = 9000) => {
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

// THUNKY THUNKS
export const setFullScoreObj = userId => {
  return async dispatch => {
    try {
      const LSDataExtract = JSON.parse(localStorage.getItem("snapshots")),
        targetLSDataObj =
          LSDataExtract && LSDataExtract.length
            ? LSDataExtract.filter(snap => snap.userId === userId)
            : [];

      const { data: dbScoreObj } = await axios.get(`/api/hours/${userId}`),
        adjFullScoreObj = dbScoreObj.concat(targetLSDataObj);

      if (adjFullScoreObj.length) dispatch(getFullScoreObj(adjFullScoreObj));
      else dispatch(getFullScoreObj([]));
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
        adjLSDataObj = condenseScoreObj(targetLSDataObj, userId);

      // INTERACT WITH DATABASE
      const newWtdScore = await axios.post("/api/hours", adjLSDataObj);

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
        { data } = await axios.post(`/api/normalizeScore`, {
          userId,
          normalizeScore,
          runningScore,
          sentimentDiff: runningScore / normalizeScore,
          timeStamp: new Date()
        }),
        { normalizeScoreArr, runningScoreArr, sentimentDiffArr } = data;
      console.log(
        "NORMAL THUNK 2 -",
        normalizeScoreArr,
        runningScoreArr,
        sentimentDiffArr
      );
      dispatch(getNormalizedScore(normalizeScoreArr));
      dispatch(getRunningScore(runningScoreArr));
      dispatch(getSentimentDiff(sentimentDiffArr));
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
    default:
      return state;
  }
};

export default scoreReducer;
