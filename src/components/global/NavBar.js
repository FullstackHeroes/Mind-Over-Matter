import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { logout } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    const userId = this.props.user.id;
    this.props.logout(userId);
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
    logout: userId => dispatch(logout(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
