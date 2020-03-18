import React, { Component } from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import TableRow from "./TableRow";
import HelpBar from "../global/HelpBar";

class Table extends Component {
  render() {
    const { fullScoreObj, user } = this.props,
      nameArr = user.name ? user.name.split(" ") : [],
      headers = [
        { label: "Time Stamp", key: "timeStamp" },
        { label: "True Score", key: "trueScore" },
        { label: "Happy %", key: "happy" },
        { label: "Surprised %", key: "surprised" },
        { label: "Neutral %", key: "neutral" },
        { label: "Disgusted %", key: "disgusted" },
        { label: "Fearful %", key: "fearful" },
        { label: "Angry %", key: "angry" },
        { label: "Sad %", key: "sad" }
      ];

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
            <span className="csvHeaderText">Download Your Results</span>

            <button className="csvBtnLimitHistory csvBtn">
              <CSVLink
                data={fullScoreObj.slice(-15).reverse()}
                headers={headers}
                filename={`${
                  nameArr.length > 1
                    ? nameArr[0] + "_" + nameArr[1]
                    : nameArr[0]
                }_Last_15.csv`}
                className="csvLinkText">
                Last 15 Score History
              </CSVLink>
            </button>

            <button className="csvBtnAllHistory csvBtn">
              <CSVLink
                data={fullScoreObj.reverse()}
                headers={headers}
                filename={`${
                  nameArr.length > 1
                    ? nameArr[0] + "_" + nameArr[1]
                    : nameArr[0]
                }_All_History.csv`}
                className="csvLinkText">
                All Score History
              </CSVLink>
            </button>
          </div>
        ) : null}

        <HelpBar />
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

export default connect(mapStateToProps)(Table);
