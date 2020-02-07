import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setFullScoreObj,
  setNormalizedScore,
  getTodaysScreenTime,
  getMonthsScreenTime,
  getYearsScreenTime,
  getYesterdaysScreenTime
} from "../../store";
import ChartRSLine from "../chart/ChartRSLine";
import ChartTSLine from "../chart/ChartTSLine";
import ChartSentiStack from "../chart/ChartSentiStack";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) {
      this.props.setFullScoreObj(user.id);
      this.props.setNormalizedScore(user.id);
      this.props.getTime(user.id);
      this.props.getMonth(user.id);
      this.props.getYear(user.id);
      this.props.getYesterday(user.id);
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
        this.props.getMonth(user.id);
        this.props.getYear(user.id);
        this.props.getYesterday(user.id);
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
            Yesterday: {this.props.yesterdaysScreenMins} mins
            <br />
            This Month: {this.props.monthsScreenHours} hours
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

        <div className="dashboardRowThree dashboardRow">
          {runningScore.length ? (
            <ChartRSLine runningScore={runningScore.slice(-10)} />
          ) : (
            "Loading"
          )}

          {fullScoreObj.length ? (
            <ChartTSLine fullScoreObj={fullScoreObj.slice(-10)} />
          ) : (
            "Loading"
          )}

          {fullScoreObj.length ? (
            <ChartSentiStack fullScoreObj={fullScoreObj.slice(-10)} />
          ) : (
            "Loading"
          )}
        </div>
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
    yearsScreenHours: state.time.screenHoursThisYear,
    yesterdaysScreenMins: state.time.screenMinsYesterday
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId)),
    getTime: userId => dispatch(getTodaysScreenTime(userId)),
    getMonth: userId => dispatch(getMonthsScreenTime(userId)),
    getYear: userId => dispatch(getYearsScreenTime(userId)),
    getYesterday: userId => dispatch(getYesterdaysScreenTime(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
