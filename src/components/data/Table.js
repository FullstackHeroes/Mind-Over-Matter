import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";
import TableRow from "./TableRow";
import { makeCsvTable } from "../../utils/utilities";

class Table extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) this.props.setFullScoreObj(user.id);
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj, user } = this.props;
    if (fullScoreObj.length !== prevProps.fullScoreObj.length) {
      this.props.setFullScoreObj(user.id);
    }
  }

  render() {
    const { fullScoreObj } = this.props;
    // console.log("TableProps:", this.props);
    // console.log("!!!!!!!!!!!!!!!", makeCsvTable(test))
    let test;
    if (fullScoreObj) test = fullScoreObj.slice(-10).reverse();
    let csvArr;
    if (test.length) csvArr = makeCsvTable(test);
    console.log(csvArr);
    // console.log("fullScoreObj", fullScoreObj.slice(-10).reverse());
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
        <div>
          <div></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fullScoreObj: state.score.fullScoreObj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
