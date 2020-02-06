import React, { Component } from "react";
import PropTypes from "prop-types";
import AlertContent from "./AlertContent";
import { connect } from "react-redux";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      lastAlert: new Date()
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
      lastAlert: new Date()
    });
  };

  render() {
    console.log("popupprops!!!!", this.props);

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

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);

//spitballing css
// .modal {
//   width: 600px;
//   background: white;
//   border: 1px solid #ccc;
//   transition: 1.1s ease-out;
//   box-shadow:
//     -2rem 2rem 2rem
