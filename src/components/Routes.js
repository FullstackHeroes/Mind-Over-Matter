import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Dashboard, Table, Login, Signup } from "./index";
import { me } from "../store";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Table" component={Table} />
        <Route
          path="/signIn"
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitial: () => dispatch(me())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
