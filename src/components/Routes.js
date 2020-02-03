import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Table } from "./index";
import { Login, Signup } from "./";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Table" component={Table} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));
