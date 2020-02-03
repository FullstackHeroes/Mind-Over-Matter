// INITIAL STATE
const initialState = {
  fullScoreObj: {}
};

// ACTION TYPES
const GET_FULL_SCORE_OBJ = "GET_FULL_SCORE_OBJ";

// ACTION CREATORS
export const getFullScoreObj = fullScoreObj => {
  return {
    type: GET_FULL_SCORE_OBJ,
    fullScoreObj
  };
};

// THUNKY THUNKS
