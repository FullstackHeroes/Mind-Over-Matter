import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";

class Dashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="dashboardFullDiv">
        <h3 className="dashboardHeader">Hi, {user.name}!</h3>
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
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
