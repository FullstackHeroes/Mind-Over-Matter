import React from "react";
import ReactDOM from "react-dom";
import "./ast/style.css";
// import "bootstrap";
import $ from "jquery";
import App from "./components/App";
// import * as serviceWorker from "./ast/serviceWorker";
import history from "./history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
// serviceWorker.register();
