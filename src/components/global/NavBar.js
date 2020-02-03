import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <div className="navBarFullDiv">
        <h1>Mind Over Matter</h1>
        <img src={logo} className="appLogo" alt="logo" />
      </div>
    );
  }
}

export default connect()(NavBar);
