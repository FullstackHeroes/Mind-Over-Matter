import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PopUp extends Component {
  onClose = () => {
    this.props.onClose && this.props.onClose()
  };
  render() {
    if (!this.props.show) {
      return null;
    }
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
          onClick={() => {this.hideHelp}}>
          close
        </button>
      </div>
    );
  }
}


PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};