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
          <Link to="/Table" className="linkText">
            Table
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(NavBar);
