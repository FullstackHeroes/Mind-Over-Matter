import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// import logo from "../../images/logo.svg";
import { logout } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    this.props.logout();
  };

  render() {
    const userId = this.props.user.id;

    return (
      <div className="navBarFullDiv">
        <div className="navBarLeft">
          <img className="userImage" src={this.props.user.imgUrl} alt="" />
          <h1 className="navBarHeader">Mind Over Matter</h1>
          {/* <img src={logo} className="appLogo" alt="logo" /> */}
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
              Data
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
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
