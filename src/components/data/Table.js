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

  async componentDidMount() {
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
    const { fullScoreObj, user } = this.props,
      nameArr = user.name ? user.name.split(" ") : [],
      headers = [
        { label: "True Score", key: "trueScore" },
        { label: "Happy %", key: "happy" },
        { label: "Surprised %", key: "surprised" },
        { label: "Neutral %", key: "neutral" },
        { label: "Disgusted %", key: "disgusted" },
        { label: "Fearful %", key: "fearful" },
        { label: "Angry %", key: "angry" },
        { label: "Sad %", key: "sad" }
      ];

    //GET MOST RECENT DATA FOR USER SNAPSHOT
    // let tenResults,
    //   csvTenArr = [];
    // if (fullScoreObj) tenResults = fullScoreObj.slice(-10).reverse();
    // if (tenResults) csvTenArr = makeCsvTable(tenResults);

    // let userDataResults,
    //   userDataArr = [];
    // if (fullScoreObj) userDataResults = fullScoreObj.reverse();
    // if (userDataResults) userDataArr = makeCsvTable(userDataResults);

    // console.log("TableAllResults", this.state.allResults);
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

        {user && fullScoreObj && fullScoreObj.length ? (
          <div className="csvFullDiv">
            <span className="csvHeaderText">Download My Results</span>

            <button>
              <CSVLink
                data={fullScoreObj.slice(-15).reverse()}
                headers={headers}
                filename={`${
                  nameArr.length > 1
                    ? nameArr[0] + "_" + nameArr[1]
                    : nameArr[0]
                }_Last_15.csv`}
                className="csvBtnLimitHistory csvBtn">
                Last 15 Score History
              </CSVLink>
            </button>

            <button>
              <CSVLink
                data={fullScoreObj.reverse()}
                headers={headers}
                filename={`${
                  nameArr.length > 1
                    ? nameArr[0] + "_" + nameArr[1]
                    : nameArr[0]
                }_All_History.csv`}
                className="csvBtnAllHistory csvBtn">
                All Score History
              </CSVLink>
            </button>
          </div>
        ) : null}

        {/* <button>
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
          </button> */}
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
