import React, { Component } from "react";

export default class PopUp extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return <div>{this.props.children}</div>;
  }
}
