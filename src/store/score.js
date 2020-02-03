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
export const getLSScoreObj = () => {
  return dispatch => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FULL_SCORE_OBJ:
      return {};
    default:
      return state;
  }
};

export default scoreReducer;
