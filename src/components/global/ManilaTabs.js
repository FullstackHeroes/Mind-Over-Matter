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
        {/* <div className="manilaTabs"> */}
        <div className=" manilaTab" activeClassName="selectedManilaTab">
          <NavLink to="/Dashboard" className="linkText" exact>
            Dashboard
          </NavLink>
        </div>
        <div className=" manilaTab" activeClassName="selectedManilaTab">
          <NavLink to="/Table" className="linkText" exact>
            Table
          </NavLink>
        </div>

        <div className=" manilaTab" activeClassName="selectedManilaTab">
          <NavLink to="/Doctor" className="linkText " exact>
            Doctors
          </NavLink>
        </div>

        <div className=" manilaTab" activeClassName="selectedManilaTab">
          <NavLink to="/Article" className="linkText" exact>
            Articles
          </NavLink>
        </div>
      </div>
      // </div>
    );
  }
  return null;
};

const ManilaTabVisible = withRouter(ManilaTabHidden);

export default ManilaTabVisible;
