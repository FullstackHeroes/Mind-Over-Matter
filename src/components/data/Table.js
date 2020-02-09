import React, { Component } from "react";
import { connect } from "react-redux";
import { setFullScoreObj } from "../../store";
import TableRow from "./TableRow";
import { makeCsvTable, getAllUserStats } from "../../utils/utilities";
import { CSVLink } from "react-csv";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allResults: []
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) this.props.setFullScoreObj(user.id);

    //GET ALL USER HISTORY DATA
    // const results = await getAllUserStats(user.id);
    // console.log("!!!USER:", user)
    // console.log("!!!!!!!!!RESULTS:", results);
    // this.setState({ allResults: makeCsvTable(results) });
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj, user } = this.props;
    if (fullScoreObj.length !== prevProps.fullScoreObj.length) {
      this.props.setFullScoreObj(user.id);
    }
  }

  getUserData() {
    const { user } = this.props;
  }

  render() {
    const { fullScoreObj } = this.props;

    //GET MOST RECENT DATA FOR USER SNAPSHOT
    let tenResults,
      csvTenArr = [];
    if (fullScoreObj) tenResults = fullScoreObj.slice(-10).reverse();
    if (tenResults) csvTenArr = makeCsvTable(tenResults);

    // let userDataResults,
    //   userDataArr = [];
    // if (fullScoreObj) userDataResults = fullScoreObj.reverse();
    // if (userDataResults) userDataArr = makeCsvTable(userDataResults);

    console.log("TableAllResults", this.state.allResults);
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
          <div> Download My Results</div>
          <button>
            <CSVLink
              data={csvTenArr}
              filename={`${this.props.user.name}_last_10.csv`}>
              Current Snapshot
            </CSVLink>
          </button>
          <button>
            <CSVLink
              data={this.state.allResults}
              filename={`${this.props.user.name}_all.csv`}>
              Download User History
            </CSVLink>
          </button>
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
