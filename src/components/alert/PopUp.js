import React, { Component } from "react";
import { dateCreate, snapIntDefault } from "../../utils/utilities";
import AlertMessage from "./AlertMessage";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = true;
    this.state = {
      lastAlert: dateCreate(),
      timeAlert: dateCreate(),
      statusCap: 1000 * 15, // SECONDS
      timeCap: 1000 * 30, // SECONDS
      timeCountCap: (60000 * 5) / snapIntDefault // COUNT CONVERSION IN MINS
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  shouldComponentUpdate() {
    if (!this.showPopUp) return false;
    return true;
  }

  showHelp = (sentimentDiff, threeHourSnapCount) => {
    const last = 75,
      currentDate = dateCreate();

    if (
      (currentDate - this.state.lastAlert > this.state.statusCap &&
        sentimentDiff <= last) ||
      (currentDate - this.state.timeAlert > this.state.timeCap &&
        threeHourSnapCount >= this.state.timeCountCap)
    ) {
      this.showPopUp = false;
      return (
        <AlertMessage
          onClose={this.hideHelp}
          status={sentimentDiff}
          last={last}
          time={threeHourSnapCount}
          timeCap={this.state.timeCountCap}
        />
      );
    }
  };

  hideHelp = () => {
    this.showPopUp = true;
    this.setState({
      lastAlert: dateCreate(),
      timeAlert: dateCreate()
    });
  };

  render() {
    const { sentimentDiff, threeHourSnapCount, detected } = this.props;

    return (
      <div className="popUpFullDiv">
        {sentimentDiff &&
        sentimentDiff.length &&
        threeHourSnapCount &&
        detected &&
        this.showPopUp
          ? this.showHelp(
              sentimentDiff[0].sentimentDiff * 100,
              threeHourSnapCount
            )
          : null}
      </div>
    );
  }
}

export default PopUp;
