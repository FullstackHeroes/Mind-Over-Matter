import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Table } from "./index";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Table" component={Table} />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));