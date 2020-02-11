import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { me } from "../store";

// IMPORTING COMPONENTS
import Routes from "./Routes";
import VideoInput from "./face/VideoInput";
import NavBar from "./global/NavBar";
import PopUp from "./alert/PopUp";

class App extends Component {
  componentDidMount() {
    this.props.loadInitial();
    if (this.props.user.id && this.props.match.path === "/")
      this.props.history.push("/Dashboard");
  }

  render() {
    const { user, sentimentDiff } = this.props;

    return (
      <div className="appFullDiv">
        <NavBar />

        {sentimentDiff && sentimentDiff.length ? (
          <PopUp sentimentDiff={sentimentDiff.slice(-1)} />
        ) : null}

        <div className="appInsideDiv">
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
    loadInitial: () => dispatch(me())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
