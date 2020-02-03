// VARIABLE
const normalizedLen = 3000;

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

export const getNormalizedScore = normalizeScore => {
  return {
    type: GET_NORMALIZED_SCORE,
    normalizeScore
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

export const calcNormalizedScore = fullScoreObj => {
  return dispatch => {
    try {
      const shortenFullScore = fullScoreObj.slice(0, normalizedLen);

      for (let val of shortenFullScore) {
      }
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
    default:
      return state;
  }
};

export default scoreReducer;
