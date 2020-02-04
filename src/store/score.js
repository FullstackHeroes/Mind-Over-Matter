import axios from "axios";
import { condenseScoreObj, calcNormalizeUtility } from "../utils/utilities";

// INITIAL STATE
const initialState = {
  fullScoreObj: [],
  normalizedScore: 0
};

// ACTION TYPES
const GET_FULL_SCORE_OBJ = "GET_FULL_SCORE_OBJ";
const GET_NORMALIZED_SCORE = "GET_NORMALIZED_SCORE";

// ACTION CREATORS
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

// THUNKY THUNKS
export const setFullScoreObj = () => {
  return async dispatch => {
    try {
      const LSDataExtract = JSON.parse(localStorage.getItem("snapshots")),
        { data: dbScoreObj } = await axios.get(`/api/hours/${userId}`),
        adjFullScoreObj = dbScoreObj.concat(LSDataExtract);

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

      console.log("POST THUNK 1 -", adjLSDataObj);
      // INTERACT WITH DATABASE
      const newWtdScore = await axios.post("/api/hours", adjLSDataObj);
      console.log("POST THUNK 2 -", newWtdScore.data);
      dispatch(getFullScoreObj(newWtdScore.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const calcNormalizedScore = userId => {
  return async dispatch => {
    try {
      const normalizeScore = await calcNormalizeUtility(userId),
        normalizeDBObj = await axios.post(`/api/normalizeScore`, {
          userId,
          normalizeScore,
          timeStamp: new Date()
        });
      console.log("NORMALIZE THUNK -", normalizeDBObj.data);
      dispatch(getNormalizedScore(normalizeScore));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FULL_SCORE_OBJ:
      return { ...state, fullScoreObj: action.fullScoreObj };
    case GET_NORMALIZED_SCORE:
      return { ...state, normalizedScore: action.normalizedScore };
    default:
      return state;
  }
};

export default scoreReducer;
