import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardFullDiv">
        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">Time Session</div>
          <div className="dashboardTable">Total Time Duration</div>
        </div>

        <div className="dashboardRowTwo dashboardRow">
          <div className="dashboardTable">Normalized Score</div>
          <div className="dashboardTable">Running True Score</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
