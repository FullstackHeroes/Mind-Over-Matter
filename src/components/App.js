import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { me } from "../store";

// IMPORTING COMPONENTS
import Routes from "./Routes";
import VideoInput from "./face/VideoInput";
import NavBar from "./global/NavBar";
import PopUp from "./alert/PopUp";
import ManilaTabVisible from "./global/ManilaTabs";

class App extends Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    const { user, sentimentDiff, threeHourSnapCount } = this.props;

    return (
      <div className="appFullDiv">
        <NavBar />

        {sentimentDiff && sentimentDiff.length ? (
          <PopUp
            sentimentDiff={sentimentDiff.slice(-1)}
            threeHourSnapCount={threeHourSnapCount}
          />
        ) : null}
        <div className="manilaContainer">
          <ManilaTabVisible />
          <div className="appInsideDiv">
            {user && user.id ? <VideoInput /> : null}

            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    sentimentDiff: state.score.sentimentDiff,
    threeHourSnapCount: state.score.threeHourSnapCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
