import axios from "axios";

// INITIAL STATE
const initialState = {
  articles: []
};

// ACTION TYPE
const GET_ARTICLES = "GET_ARTICLES";
const POST_ARTICLES = "POST_ARTICLES";

// ACTION CREATOR
export const getArticles = articles => {
  return {
    type: GET_ARTICLES,
    articles
  };
};

// THUNKY THUNK
export const getArticleList = () => {
  return async dispatch => {
    try {
      // const { data: articles } = await axios.get(`/api/article`);
      const { data: articles } = await axios.post(`/api/article`);
      if (articles && articles.length) {
        dispatch(getArticles(articles));
      } else dispatch(getArticles([]));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    default:
      return state;
  }
};

export default articleReducer;
