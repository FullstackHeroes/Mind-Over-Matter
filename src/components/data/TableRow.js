import React, { Component } from "react";
import { connect } from "react-redux";

class TableRow extends Component {
  render() {
    const { score } = this.props,
      {
        trueScore,
        screenScore,
        happy,
        surprised,
        neutral,
        disgusted,
        fearful,
        angry,
        sad
      } = score,
      decimal = 1;

    return (
      <tr className="tableData">
        <td className="tableDataRow">{trueScore.toFixed(decimal)}</td>
        <td className="tableDataRow">
          {(screenScore * 100).toFixed(decimal)}%
        </td>
        <td className="tableDataRow">{(happy * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(surprised * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(neutral * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(disgusted * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(fearful * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(angry * 100).toFixed(decimal)}%</td>
        <td className="tableDataRow">{(sad * 100).toFixed(decimal)}%</td>
      </tr>
    );
  }
}

export default connect()(TableRow);
