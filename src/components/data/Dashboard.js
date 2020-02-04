import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardFullDiv">
        <div className="dashboardRowOne">
          <div>One</div>
          <div>Two</div>
        </div>

        <div className="dashboardRowTwo">
          <div>Three</div>
          <div>Four</div>
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
