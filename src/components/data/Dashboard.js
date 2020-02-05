import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj, setNormalizedScore } from "../../store";
import { calcWeightedTrueScore } from "../../utils/utilities";
import ScreenTime from "./ScreenTime";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      wtdTrueScore: "Loading"
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) this.props.setFullScoreObj(user.id);
  }

  async componentDidUpdate(prevProps) {
    const { fullScoreObj, user } = this.props;
    if (user && user.id) {
      if (
        fullScoreObj.length !== prevProps.fullScoreObj.length ||
        user.id !== prevProps.user.id
      ) {
        this.props.setFullScoreObj(user.id);
        this.props.setNormalizedScore(user.id);
        const wtdTrueScore = await calcWeightedTrueScore(user.id);
        this.setState({ wtdTrueScore: wtdTrueScore.toFixed(3) });
      }
    }
  }

  render() {
    const { user, fullScoreObj, normalizedScore } = this.props;

    return (
      <div className="dashboardFullDiv">
        <h3 className="dashboardHeader">Hi, {user.name}!</h3>
        <div className="dashboardRowOne dashboardRow">
          <div className="dashboardTable">Time Session</div>
          <div className="dashboardTable">
            <ScreenTime user={user} />
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
            <span className="dashboardContent">{this.state.wtdTrueScore}</span>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fullScoreObj: state.score.fullScoreObj,
    normalizedScore: state.score.normalizedScore,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
