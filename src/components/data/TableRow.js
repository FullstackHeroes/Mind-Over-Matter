import React, { Component } from "react";
import { connect } from "react-redux";

class TableRow extends Component {
  render() {
    const { score } = this.props,
      decimal = 3;

    return (
      <tr className="tableData">
        <td className="tableDataRow">{score.trueScore.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.happy.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.surprised.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.neutral.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.disgusted.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.fearful.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.angry.toFixed(decimal)}</td>
        <td className="tableDataRow">{score.sad.toFixed(decimal)}</td>
      </tr>
    );
  }
}

export default connect()(TableRow);
