import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) this.props.setFullScoreObj(user.id);
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj, user } = this.props;
    if (fullScoreObj.length !== prevProps.fullScoreObj.length) {
      this.props.setFullScoreObj(user.id);
    }
  }

  render() {
    const { user } = this.props;
    console.log("RENDER --", this.props.state);

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
    user: state.user,
    fullScoreObj: state.score.fullScoreObj,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
