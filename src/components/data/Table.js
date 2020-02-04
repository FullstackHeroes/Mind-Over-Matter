import React, { Component } from "react";
import { connect } from "react-redux";
import { getLSScoreObj } from "../../store";
import TableRow from "./TableRow";

class Table extends Component {
  componentDidMount() {
    this.props.getLSScoreObj();
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj } = this.props;
    if (fullScoreObj.length !== prevProps.fullScoreObj.length) {
      this.props.getLSScoreObj();
    }
  }

  render() {
    const { fullScoreObj } = this.props;

    return (
      <div className="tableFullDiv">
        <table className="tableElement">
          <thead>
            <tr className="tableHeader">
              <th className="tableHeaderRow">True Score</th>
              <th className="tableHeaderRow">Screen Score</th>
              <th className="tableHeaderRow">Happy</th>
              <th className="tableHeaderRow">Surprised</th>
              <th className="tableHeaderRow">Neutral</th>
              <th className="tableHeaderRow">Disgusted</th>
              <th className="tableHeaderRow">Fearful</th>
              <th className="tableHeaderRow">Angry</th>
              <th className="tableHeaderRow">Sad</th>
            </tr>
          </thead>

          <tbody>
            {fullScoreObj
              ? fullScoreObj
                  .slice(-10)
                  .reverse()
                  .map((score, idx) => <TableRow key={idx} score={score} />)
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fullScoreObj: state.score.fullScoreObj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLSScoreObj: () => dispatch(getLSScoreObj())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
