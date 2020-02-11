import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";

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
    }
  }

  render() {
    const {
      user,
      fullScoreObj,
      normalizedScore,
      runningScore,
      sentimentDiff,
      todaysScreenMins,
      yesterdaysScreenMins,
      weeksScreenHours
    } = this.props;
    // console.log("RENDER !", this.props);

    return (
      <div className="dashboardFullDiv">
        <h3 className="dashboardHeader">Hi, {user.name}!</h3>

        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">
            <ScreenTimeToday todaysScreenHours={todaysScreenMins} />
            <ScreenTimeYesterday yesterdaysScreenHours={yesterdaysScreenMins} />
          </div>

          <div className="dashboardTable">
            <ScreenTimeWeek weeksScreenHours={weeksScreenHours} />
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
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
              {sentimentDiff.length
                ? (
                    sentimentDiff[sentimentDiff.length - 1].sentimentDiff * 100
                  ).toFixed(1)
                : null}
              %
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
            <ChartRSLine runningScore={[]} />
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
    todaysScreenMins: state.score.screenMinsToday,
    yesterdaysScreenMins: state.score.screenMinsYesterday,
    weeksScreenHours: state.score.screenHoursWeek
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
