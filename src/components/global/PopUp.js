import React, { Component } from "react";
import AlertContent from "./AlertContent";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      lastAlert: new Date()
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
      lastAlert: new Date()
    });
  };

  render() {
    const { sentimentDiff } = this.props;

    return (
      <div className="popUpFullDiv">
        {sentimentDiff && sentimentDiff.length ? (
          <AlertContent
            onClose={this.hideHelp}
            sentimentDiff={sentimentDiff[0].sentimentDiff}
            lastAlert={this.state.lastAlert}
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
