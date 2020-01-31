import React from "react";
import ReactDOM from "react-dom";
import "./ast/style.css";
import App from "./components/App";
import * as serviceWorker from "./ast/serviceWorker";
import { Provider } from "react-redux";
// import { Router } from "react-router-dom";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
serviceWorker.register();
