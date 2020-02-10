import React, { Component } from "react";
import AlertMessage from "./AlertMessage";
import { dateCreate } from "../../utils/utilities";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = true;
    this.state = {
      lastAlert: dateCreate()
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  shouldComponentUpdate() {
    if (!this.showPopUp) return false;
    return true;
  }

  showHelp = sentimentDiff => {
    const last = 75;
    if (sentimentDiff <= last) {
      this.showPopUp = false;
      return (
        <AlertMessage
          onClose={this.hideHelp}
          status={sentimentDiff}
          last={last}
        />
      );
    }
  };

  hideHelp = () => {
    this.showPopUp = true;
    this.setState({
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
        this.showPopUp &&
        currentDate - this.state.lastAlert > 10000
          ? this.showHelp(sentimentDiff[0].sentimentDiff * 100)
          : null}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     // snapInterval: state.score.snapInterval,
//     // threeHourSnapCount: state.time.threeHourSnapCount
//   };
// };

// // export default connect(mapStateToProps)(PopUp);
export default PopUp;
