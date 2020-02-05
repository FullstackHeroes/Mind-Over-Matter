import React, { Component } from "react";
import { connect } from "react-redux";

// IMPORT COMPONENTS
import ChartTSLine from "./ChartTSLine";

class AppTSLine extends Component {
  renderData(liveData) {
    return !liveData || !liveData.length ? (
      <h3 className="loadDataText">Load Some Data First!</h3>
    ) : (
      <ChartTSLine />
    );
  }

  render() {
    return (
      <div className="appTSLineDiv">{this.renderData(this.props.liveData)}</div>
    );
  }
}

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(AppTSLine);
