import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardFullDiv">
        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">One</div>
          <div className="dashboardTable">Two</div>
        </div>

        <div className="dashboardRowTwo dashboardRow">
          <div className="dashboardTable">Three</div>
          <div className="dashboardTable">Four</div>
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
