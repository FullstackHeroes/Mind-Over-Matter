import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "./user";
import score from "./score";
import time from "./screenTime";

const reducer = combineReducers({ user, score, time });

const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./score";
export * from "./screenTime";
