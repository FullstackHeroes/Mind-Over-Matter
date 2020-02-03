import React, { Component } from "react";
import { connect } from "react-redux";
import TableRow from "./TableRow";

class Table extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="tableFullDiv">
        <table className="tableElement">
          <thead>
            <tr className="tableHeader">
              <th className="tableHeaderRow">True Score</th>
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
            <TableRow />
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Table);
