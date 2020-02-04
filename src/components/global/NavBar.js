import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <div className="navBarFullDiv">
        <div className="navBarLeft">
          <h1>Mind Over Matter</h1>
          <img src={logo} className="appLogo" alt="logo" />
        </div>

        <div className="navBarRight">
          <Link to="/Dashboard" className="linkText">
            Dashboard
          </Link>

          <Link to="/Table" className="linkText">
            Table
          </Link>

          {isLoggedIn ? (
            <a href="#" onClick={handleClick} className="linkText">
              Logout
            </a>
          ) : (
            <Link to="/signIn" className="linkText sign-in">
              Sign In
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavBar);
