import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export default class ManilaTab extends Component {
  render() {
    return (
      <div className="manilaTabWidth">
        <div className="manilaTabs">
          {/* <div className="manilaTab" activeClassName="selectedManilaTab"> */}
          <NavLink
            to="/Dashboard"
            className="linkText manilaTab"
            activeClassName="selectedManilaTab"
            exact>
            Dashboard
          </NavLink>
          {/* </div>
          <div className="manilaTab" activeClassName="selectedManilaTab"> */}
          <NavLink
            to="/Table"
            className="linkText manilaTab"
            activeClassName="selectedManilaTab"
            exact>
            Table
          </NavLink>
        </div>
      </div>
      // </div>
    );
  }
}