import React, { Component } from "react";
import AlertContent from "./AlertContent";
import AlertMessage from "./AlertMessage";
import { dateCreate } from "../../utils/utilities";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      lastAlert: dateCreate()
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  showHelp = () => {
    this.setState({ showPopUp: true });
  };

  hideHelp = () => {
    this.setState({
      showPopUp: false,
      lastAlert: dateCreate()
    });
  };

  render() {
    const { sentimentDiff } = this.props,
      currentDate = dateCreate();

    return (
      <div className="popUpFullDiv">
        {sentimentDiff &&
        sentimentDiff.length &&
        currentDate - this.state.lastAlert > 5000 ? (
          <AlertMessage
            onClose={this.hideHelp}
            status={sentimentDiff[0].sentimentDiff * 100}
            // lastAlert={this.state.lastAlert}
            // snapInterval={this.props.snapInterval}
            // threeHourSnapCount={this.props.threeHourSnapCount}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    normalizedScore: state.score.normalizedScore
    // snapInterval: state.score.snapInterval,
    // threeHourSnapCount: state.time.threeHourSnapCount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
export default PopUp;
