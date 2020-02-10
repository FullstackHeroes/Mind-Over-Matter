import React, { Component } from "react";
import AlertContent from "./AlertContent";
import AlertMessage from "./AlertMessage";
import { dateCreate } from "../../utils/utilities";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: true,
      lastAlert: dateCreate()
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  showHelp = () => {
    console.log("HELLO!");
    this.setState({ showPopUp: false });
  };

  hideHelp = () => {
    this.setState({
      showPopUp: true,
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
        this.state.showPopUp &&
        currentDate - this.state.lastAlert > 5000 ? (
          <AlertMessage
            noMoreAlert={this.showHelp}
            onClose={this.hideHelp}
            status={sentimentDiff[0].sentimentDiff * 100}
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
