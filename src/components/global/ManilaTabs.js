import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const ManilaTabHidden = props => {
  const { location } = props;
  if (location.pathname.match("/") || location.pathname.match("/SignIn")) {
    return null;
  }
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

        <NavLink
          to="/Doctor"
          className="linkText manilaTab"
          activeClassName="selectedManilaTab"
          exact>
          Doctors
        </NavLink>

        <NavLink
          to="/Article"
          className="linkText manilaTab"
          activeClassName="selectedManilaTab"
          exact>
          Articles
        </NavLink>
      </div>
    </div>
    // </div>
  );
};

const ManilaTabVisible = withRouter(ManilaTabHidden);

export default ManilaTabVisible;
