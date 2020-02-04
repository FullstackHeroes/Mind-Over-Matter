import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { logout } from "../../store";

class NavBar extends Component {
  render() {
    const { user } = this.props;

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

          {user && user.id ? (
            <a
              href="#"
              onClick={() => this.props.logout()}
              className="linkText">
              Logout
            </a>
          ) : (
            <Link to="/SignIn" className="linkText sign-in">
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
