import axios from "axios";

//We are probably going to have more than one type of graph
//Just threw a quick template together so that we have it

/**
 * ACTION TYPES
 */
const GET_GRAPH = "GET_GRAPH";
const REMOVE_GRAPH = "REMOVE_GRAPH";

/**
 * INITIAL STATE
 */
const defaultGraph = {};

/**
 * ACTION CREATORS
 */
const gotGraph = graph => ({ type: GET_GRAPH, graph });
const removeGraph = () => ({ type: REMOVE_GRAPH });

/**
Thunks
 */

export const getAGraph = function(id) {
  return async dispatch => {
    // const { data } = Async call here
    dispatch(gotGraph(data));
  };
};

//REDUCERS

export default function flowerReducer(graph = {}, action) {
  switch (action.type) {
    case GET_GRAPH:
      return {
        /* GraphStuff*/
      };
    case REMOVE_GRAPH:
      return {
        /* GraphStuff*/
      };
    default:
      return graph;
  }
}
