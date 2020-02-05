import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";

class ScreenTime extends Component {
  componentDidMount() {}

  render() {
    console.log("ST!!!", this.props.todaysScreenMins);
    return <div>{}</div>;
  }
}

const mapStateToProps = state => {
  return {
    todaysScreenMins: state.time.screenMinstoday
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTime);
