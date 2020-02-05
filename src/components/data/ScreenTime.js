import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodaysScreenTime } from "../../store/screenTime";

class ScreenTime extends Component {
  componentDidMount() {
    this.props.getToday(this.props.user.id);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    console.log("updating -", user);
    if (user.id !== prevProps.user.id) {
      this.props.getToday(user.id);
    }
  }

  render() {
    return <div>{this.props.todaysScreenMins}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    todaysScreenMins: state.time.screenMinsToday,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToday: userId => dispatch(getTodaysScreenTime(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTime);
