import React, { Component } from "react";
import AlertContent from "./AlertContent";
import { connect } from "react-redux";
import { dateCreate } from "../../utils/utilities";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      lastAlert: dateCreate()
    };
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  showHelp = () => {
    this.setState({ showPopUp: true });
  };

  hideHelp = () => {
    this.setState({
      showPopUp: false,
      lastAlert: dateCreate()
    });
  };

  render() {
    console.log("pop up render -", this.props);
    return (
      <div>
        <AlertContent
          onClose={this.hideHelp}
          currentSentiment={this.props.currentSentiment}
          lastAlert={this.state.lastAlert}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    normalizedScore: state.score.normalizedScore
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
export default PopUp;
