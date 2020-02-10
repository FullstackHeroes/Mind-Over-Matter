import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setFullScoreObj,
  setNormalizedScore,
  getTodaysScreenTime,
  getYesterdaysScreenTime,
  getWeeksScreenTime,
  getThreeHourSnapCount
} from "../../store";
import ChartRSLine from "../chart/ChartRSLine";
import ChartTSLine from "../chart/ChartTSLine";
import ChartSentiStack from "../chart/ChartSentiStack";
import ScreenTimeToday from "../chart/ScreenTimeToday";
import ScreenTimeYesterday from "../chart/ScreenTimeYesterday";
import ScreenTimeWeek from "../chart/ScreenTimeWeek";

import HelpBar from "../global/HelpBar";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) {
      this.props.setFullScoreObj(user.id);
      this.props.setNormalizedScore(user.id);
      this.props.getTime(user.id);
      this.props.getYesterday(user.id);
      this.props.getWeek(user.id);
      this.props.getSnaps(user.id);
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
        this.props.getYesterday(user.id);
        this.props.getWeek(user.id);
        this.props.getSnaps(user.id);
      }
    }
  }

  render() {
    const {
      user,
      fullScoreObj,
      normalizedScore,
      runningScore,
      sentimentDiff
    } = this.props;

    return (
      <div className="dashboardFullDiv">
        <h3 className="dashboardHeader">Hi, {user.name}!</h3>

        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">
            <ScreenTimeToday todaysScreenHours={this.props.todaysScreenMins} />
            <ScreenTimeYesterday
              yesterdaysScreenHours={this.props.yesterdaysScreenMins}
            />
          </div>

          <div className="dashboardTable">
            <ScreenTimeWeek weeksScreenHours={this.props.weeksScreenHours} />
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
            <span className="dashboardLabel">
              Running True Score {"&"} Variance
            </span>
            <span className="dashboardContent">
              {runningScore.length
                ? runningScore[runningScore.length - 1].runningScore.toFixed(3)
                : "Loading"}
              {"  /  "}
              {sentimentDiff.length
                ? (
                    sentimentDiff[sentimentDiff.length - 1].sentimentDiff * 100
                  ).toFixed(1) + "%"
                : null}
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
            <p>Loading</p>
          )}

          {fullScoreObj.length ? (
            <ChartTSLine fullScoreObj={fullScoreObj.slice(-10)} />
          ) : (
            <p>Loading</p>
          )}

          {fullScoreObj.length ? (
            <ChartSentiStack fullScoreObj={fullScoreObj.slice(-10)} />
          ) : null}
        </div>

        <HelpBar />
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
    sentimentDiff: state.score.sentimentDiff,
    todaysScreenMins: state.time.screenMinsToday,
    yesterdaysScreenMins: state.time.screenMinsYesterday,
    weeksScreenHours: state.time.screenHoursWeek
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId)),
    getTime: userId => dispatch(getTodaysScreenTime(userId)),
    getYesterday: userId => dispatch(getYesterdaysScreenTime(userId)),
    getWeek: userId => dispatch(getWeeksScreenTime(userId)),
    getSnaps: userId => dispatch(getThreeHourSnapCount(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
