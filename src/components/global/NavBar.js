import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { logout, postNormalizedScore } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    const userId = this.props.user.id;
    // POST A NEW GROUPED TRUE SCORE / DATA SET WHEN LOGGING OUT
    this.props.logout(userId);
    // POST A NEW NORMALIZED SCORE INTO DATABASE WHEN LOGGING OUT
    this.props.postNormalizedScore(userId);
  };

  render() {
    const userId = this.props.user.id;

    return (
      <div className="navBarFullDiv">
        <div className="navBarLeft">
          <h1 className="navBarHeader">Mind Over Matter</h1>
          <img src={logo} className="appLogo" alt="logo" />
        </div>

        {userId ? (
          <div className="navBarRight">
            <NavLink
              to="/"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact>
              HomePage
            </NavLink>

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

            <a
              href="#"
              onClick={this.loggingOut}
              className="linkText navBarLink">
              Logout
            </a>
          </div>
        ) : (
          <div className="navBarRight">
            <NavLink
              to="/"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact>
              HomePage
            </NavLink>

            <NavLink
              to="/SignIn"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact>
              Sign In
            </NavLink>
          </div>
        )}
      </div>
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
    logout: userId => dispatch(logout(userId)),
    postNormalizedScore: userId => dispatch(postNormalizedScore(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
