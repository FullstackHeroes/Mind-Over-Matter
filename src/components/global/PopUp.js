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
        <h1>WAAASSSAAAAAAA!!!!</h1>
        {console.log("Help!!!!!!!!!!!",this.props.helpStatus)}
        <button
          style={{
            position: "absolute",
            bottom: 0
          }}
          onClick={this.onClose}>
          close
        </button>
      </div>
    );
  }
}

//spitballing css
// .modal {
//   width: 600px;
//   background: white;
//   border: 1px solid #ccc;
//   transition: 1.1s ease-out;
//   box-shadow: 
//     -2rem 2rem 2rem 


PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};