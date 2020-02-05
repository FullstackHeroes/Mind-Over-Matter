import React, { Component } from "react";
import { connect } from "react-redux";

// IMPORT COMPONENTS
import ChartTSLine from "./ChartTSLine";

class AppTSLine extends Component {
  renderData(scoreObj) {
    return !scoreObj || !scoreObj.length ? (
      <h3 className="loadDataText">Load Some Data First!</h3>
    ) : (
      <ChartTSLine />
    );
  }

  render() {
    return (
      <div className="appTSLineDiv">
        {this.renderData(this.props.fullScoreObj)}
      </div>
    );
  }
}

const mapState = state => {
  return {
    fullScoreObj: state.score.fullScoreObj
  };
};

export default connect(mapState)(AppTSLine);
