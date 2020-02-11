import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export default class ManilaTab extends Component {
  render() {
    return (
      <div className="navBarFullDiv">
        <div className="navBarRight">
          <NavLink
            to="/Dashboard"
            className="linkText navBarLink"
            activeClassName="selectedNavLink"
            exact>
            Dashboard
          </NavLink>

          <NavLink
            to="/Table"
            className="linkText navBarLink"
            activeClassName="selectedNavLink"
            exact>
            Table
          </NavLink>
        </div>
      </div>
    );
  }
}
