// INITIAL STATE
const initialState = {
  fullScoreObj: []
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
