import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, Table } from "./index";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Table" component={Table} />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));
