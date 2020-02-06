import React, { Component } from "react";
import PropTypes from "prop-types";
import AlertContent from "./AlertContent";
import { setNormalizedScore } from "../../store";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      emoPercent: 0,
      lastAlert: new Date()
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  showHelp = () => {
    this.setState({ showPopUp: true });
  };

  hideHelp = () => {
    this.setState({ showPopUp: false });
  };

  //USER DATA AND CALCULATIONS
  calcNormScore = async () => {
    const { normalizedScore } = this.props,
      mostRecentNormalized = normalizedScore[0].normalizeScore,
      RunningTrueScore = await calcWeightedTrueScore(userId),
      perDiff = percentDifference(RunningTrueScore, mostRecentNormalized);

    //THE TRIGGER TO SHOW THE HELP ALERT
    const checkDate = new Date();
    // 15 mins in milisecs: 900000

    if (
      checkDate - this.state.lastAlert > 10000 &&
      this.state.emoPercent <= 80
    ) {
      this.setState({
        emoPercent: perDiff * 100
      });
      this.showHelp();
    }
  };

  render() {
    const helpStatus = this.props.helpStatus;

    if (!this.props.show) return null;

    return (
      <div>
        <AlertContent onClose={this.showHelp} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    normalizedScore: state.score.normalizedScore
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);

//spitballing css
// .modal {
//   width: 600px;
//   background: white;
//   border: 1px solid #ccc;
//   transition: 1.1s ease-out;
//   box-shadow:
//     -2rem 2rem 2rem

PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
