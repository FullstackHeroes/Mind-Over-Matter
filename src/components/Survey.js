import React, { Component } from "react";
import { connect } from "react-redux";
class Survey extends Component {
  render() {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label>
              <input type="radio"></input>
              <small>Great</small>
            </label>
          </div>
          <div>
            <label>
              <input type="radio"></input>
              <small>Good</small>
            </label>
          </div>
          <div>
            <label>
              <input type="radio"></input>
              <small>OK</small>
            </label>
          </div>
          <div>
            <label>
              <input type="radio"></input>
              <small>Not Good</small>
            </label>
          </div>
          <div>
            <label>
              <input type="radio"></input>
              <small>Bad</small>
            </label>
          </div>
          <div>
            <label>
              <input type="submit"></input>
              <small>Submit</small>
            </label>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Survey);
