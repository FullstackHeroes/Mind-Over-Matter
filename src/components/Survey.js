import React from "react";
import { connect } from "react-redux";
import { checkPropTypes } from "prop-types";
const Survey = props => {
  const { user, handleSubmit } = props;

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
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

Survey.prototypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Survey);
