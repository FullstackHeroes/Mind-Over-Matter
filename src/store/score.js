import axios from "axios";
import { calcNormalizeUtility } from "../utils/utilities";

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
export const getLSScoreObj = LSData => {
  return dispatch => {
    try {
      const LSDataExtract = JSON.parse(localStorage.getItem("snapshots"));
      if (LSData) dispatch(getFullScoreObj(LSData));
      else if (LSDataExtract && LSDataExtract.length) {
        dispatch(getFullScoreObj(LSDataExtract));
      }
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
