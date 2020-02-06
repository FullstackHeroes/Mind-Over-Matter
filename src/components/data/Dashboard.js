import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj, setNormalizedScore } from "../../store";
import ChartTSLine from "../chart/ChartTSLine";
import {
  getTodaysScreenTime,
  getMonthsScreenTime,
  gotYearsScreenTime
} from "../../store/screenTime";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) {
      this.props.setFullScoreObj(user.id);
      this.props.setNormalizedScore(user.id);
      this.props.getTime(user.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj, user } = this.props;
    if (user && user.id) {
      if (
        fullScoreObj.length !== prevProps.fullScoreObj.length ||
        user.id !== prevProps.user.id
      ) {
        this.props.setFullScoreObj(user.id);
        this.props.setNormalizedScore(user.id);
        this.props.getTime(user.id);
      }
    }
  }

  render() {
    const { user, fullScoreObj, normalizedScore, runningScore } = this.props;

    return (
      <div className="dashboardFullDiv">
        <h3 className="dashboardHeader">Hi, {user.name}!</h3>

        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">Time Session</div>
          <div className="dashboardTable">
            Today: {this.props.todaysScreenMins} mins
            <br />
            This Month: {this.props.monthsScreenHours} hours
            <br />
            This Year: {this.props.yearsScreenHours} hours
          </div>
        </div>

        <div className="dashboardRowTwo dashboardRow">
          <div className="dashboardTable">
            <span className="dashboardLabel">Normalized Score</span>
            <span className="dashboardContent">
              {normalizedScore.length
                ? normalizedScore[
                    normalizedScore.length - 1
                  ].normalizeScore.toFixed(3)
                : "Loading"}
            </span>
          </div>

          <div className="dashboardTable">
            <span className="dashboardLabel">Running True Score</span>
            <span className="dashboardContent">
              {runningScore.length
                ? runningScore[runningScore.length - 1].runningScore.toFixed(3)
                : "Loading"}
            </span>
          </div>

          <div className="dashboardTable">
            <span className="dashboardLabel">Latest True Score</span>
            <span className="dashboardContent">
              {fullScoreObj.length
                ? fullScoreObj[fullScoreObj.length - 1].trueScore.toFixed(3)
                : "Loading"}
            </span>
          </div>
        </div>

        {runningScore.length ? (
          <ChartTSLine runningScore={runningScore.slice(-30)} />
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fullScoreObj: state.score.fullScoreObj,
    normalizedScore: state.score.normalizedScore,
    runningScore: state.score.runningScore,
    todaysScreenMins: state.time.screenMinsToday,
    monthsScreenHours: state.time.screenHoursThisMonth,
    yearsScreenHours: state.time.screenHoursThisYear
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId)),
    getTime: userId =>
      dispatch(
        getTodaysScreenTime(userId),
        getMonthsScreenTime(userId),
        gotYearsScreenTime(userId)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
