import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import {
  Dashboard,
  Table,
  Login,
  Signup,
  Homepage,
  Doctor,
  ArticleList
} from "./index";
import { me } from "../store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitial();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Table" component={Table} />
        <Route exact path="/Doctor" component={Doctor} />
        <Route exact path="/Article" component={ArticleList} />
        <Route
          exact
          path="/SignIn"
          render={() => (
            <div className="signInFullDiv">
              <Login />
              <Signup />
            </div>
          )}
        />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitial: () => dispatch(me())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Routes));
