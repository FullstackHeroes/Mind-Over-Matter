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
        <div className=" manilaTab">
          <NavLink
            to="/Dashboard"
            className="linkText"
            activeClassName="selectedManilaTab"
            exact>
            Dashboard
          </NavLink>
        </div>

        <div className="manilaTab">
          <NavLink
            to="/Table"
            className="linkText"
            activeClassName="selectedManilaTab"
            exact>
            Table
          </NavLink>
        </div>

        <div className="manilaTab">
          <NavLink
            to="/Doctor"
            className="linkText"
            activeClassName="selectedManilaTab"
            exact>
            Doctors
          </NavLink>
        </div>

        <div className="manilaTab">
          <NavLink
            to="/Article"
            className="linkText"
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
