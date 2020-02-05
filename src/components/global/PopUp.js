import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PopUp extends React.Component {
  onClose = e => {
    this.props.showPopUp = false && this.props.onClose(e);
  };
  render() {
    if (!this.props.showPopUp) {
      return null;
    }
    // return <div>{this.props.children}</div>;
    return (
      <div
        style={{
          position: "relative"
        }}>
        <h1>WAAASSSAAAAAAA</h1>

        <button
          style={{
            position: "absolute",
            bottom: 0
          }}
          class="toggle-button"
          onClick={this.onClose}>
          close
        </button>
      </div>
    );
  }
}
