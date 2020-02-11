import React, { Component } from "react";
import AlertMessage from "./AlertMessage";
import { dateCreate, snapIntDefault } from "../../utils/utilities";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = true;
    this.state = {
      lastAlert: dateCreate(),
      timeAlert: dateCreate(),
      timeCap: 1 //10800 / snapIntDefault //10,800 IS THE AMT OF SECONDS IN 3 HRS DIV BY THE SNAP INTERVAL MILLISECONDS  DIV BY 1000 T0 GET SECONDS VALUE
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  shouldComponentUpdate() {
    if (!this.showPopUp) return false;
    return true;
  }

  showHelp = (sentimentDiff, threeHourSnapCount) => {
    const last = 75;
    if (sentimentDiff <= last) {
      this.showPopUp = false;
      return (
        <AlertMessage
          onClose={this.hideHelp}
          status={sentimentDiff}
          last={last}
          time={this.props.threeHourSnapCount}
          timeCap={this.state.timeCap}
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
    const { sentimentDiff, threeHourSnapCount } = this.props,
      currentDate = dateCreate();

    return (
      <div className="popUpFullDiv">
        {console.log("3hrsnap:", threeHourSnapCount)}
        {console.log("currD-timeAlert:", currentDate - this.state.timeAlert)}
        {console.log(
          "time, time cap:",
          this.props.threeHourSnapCount,
          this.state.timeCap
        )}
        {(sentimentDiff &&
          sentimentDiff.length &&
          this.showPopUp &&
          currentDate - this.state.lastAlert > 10000) ||
        currentDate - this.state.timeAlert > 1 //this.state.timeCap
          ? this.showHelp(
              sentimentDiff[0].sentimentDiff * 100,
              threeHourSnapCount
            )
          : null}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     // snapInterval: state.score.snapInterval,
//     threeHourSnapCount: state.time.threeHourSnapCount //num of captures that happen in 3 hrs / 1000 * 60 ~ mins present
//   };
// };

// export default connect(mapStateToProps, null)(PopUp);
export default PopUp;
