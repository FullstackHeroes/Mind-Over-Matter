import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const ManilaTabHidden = props => {
  const { location } = props;
  if (
    location.pathname.match("/Dashboard") ||
    location.pathname.match("/Table") ||
    location.pathname.match("/Doctor") ||
    location.pathname.match("/Article")
  ) {
    return (
      <div className="manilaTabWidth">
        <div className="manilaTabs">
          <NavLink
            to="/Dashboard"
            className="linkText manilaTab"
            activeClassName="selectedManilaTab"
            exact>
            Dashboard
          </NavLink>
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
    );
  }
  return null;
};

const ManilaTabVisible = withRouter(ManilaTabHidden);

export default ManilaTabVisible;
