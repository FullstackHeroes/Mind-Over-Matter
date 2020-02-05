import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";
import { getTodaysScreenTime } from "../../store/screenTime";
import { dispatch } from "d3";
class ScreenTime extends Component {
  componentDidMount = async () => {
    await getTodaysScreenTime(this.props.user.id);
  };

  render() {
    console.log("ST!!!", this.props.todaysScreenMins);
    return <div>{this.props.todaysScreenMins}</div>;
  }
}

const mapStateToProps = state => {
  return {
    todaysScreenMins: state.time.screenMinstoday
  };
};

export default connect(mapStateToProps)(ScreenTime);
