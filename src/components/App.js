import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { me } from "../store";

// IMPORTING COMPONENTS
import Routes from "./Routes";
import VideoInput from "./face/VideoInput";
import NavBar from "./global/NavBar";

class App extends Component {
  componentDidMount() {
    this.props.loadInitial();
    if (this.props.user.id && this.props.match.path === "/")
      this.props.history.push("/Dashboard");
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      if (this.props.match.path === "/") this.props.history.push("/Dashboard");
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="appFullDiv">
        <NavBar />

        <div className="appInsideDiv d-flex justify-content-center">
          {user && user.id ? <VideoInput /> : null}
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitial: () => dispatch(me())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
