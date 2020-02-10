import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { me, getSentimentDiff } from "../store";

// IMPORTING COMPONENTS
import Routes from "./Routes";
import VideoInput from "./face/VideoInput";
import NavBar from "./global/NavBar";
import PopUp from "./alert/PopUp";

class App extends Component {
  componentDidMount() {
    this.props.loadInitial();
    this.props.getSentimentDiff();
    if (this.props.user.id && this.props.match.path === "/")
      this.props.history.push("/Dashboard");
  }

  componentDidUpdate(prevProps) {
    // if (this.props.user.id !== prevProps.user.id) {
    //   if (this.props.match.path === "/") this.props.history.push("/Dashboard");
    // }

    this.props.getSentimentDiff();

    // const { sentimentDiff } = this.props;
    // if (sentimentDiff) {
    //   console.log("hmm -", sentimentDiff);
    //   if (sentimentDiff.length !== prevProps.sentimentDiff.length) {
    //     console.log("updating!!");
    //   }
    // }
  }

  render() {
    const { user, sentimentDiff } = this.props;
    console.log("render -", sentimentDiff);
    return (
      <div className="appFullDiv">
        <NavBar />

        {/* <div className="appInsideDiv d-flex justify-content-center"> */}
        <div className="appInsideDiv">
          {sentimentDiff && sentimentDiff.length ? (
            <PopUp sentimentDiff={sentimentDiff.slice(-1)} />
          ) : null}

          {user && user.id ? <VideoInput /> : null}

          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    sentimentDiff: state.score.sentimentDiff
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitial: () => dispatch(me()),
    getSentimentDiff: () => dispatch(getSentimentDiff())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
