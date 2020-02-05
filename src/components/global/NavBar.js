import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { logout, calcNormalizedScore } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    const userId = this.props.user.id;
    // POST A NEW GROUPED TRUE SCORE / DATA SET WHEN LOGGING OUT
    this.props.logout(userId);
    // POST A NEW NORMALIZED SCORE INTO DATABASE WHEN LOGGING OUT
    this.props.calcNormalizedScore(userId);
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
            <Link to="/Dashboard" className="linkText navBarLink">
              Dashboard
            </Link>

            <Link to="/Table" className="linkText navBarLink">
              Table
            </Link>

            <a
              href="#"
              onClick={this.loggingOut}
              className="linkText navBarLink">
              Logout
            </a>
          </div>
        ) : (
          <div className="navBarRight">
            <Link to="/" className="linkText navBarLink">
              HomePage
            </Link>

            <Link to="/SignIn" className="linkText navBarLink">
              Sign In
            </Link>
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
    calcNormalizedScore: userId => dispatch(calcNormalizedScore(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
