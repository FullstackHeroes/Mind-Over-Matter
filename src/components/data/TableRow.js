import React, { Component } from "react";
import { connect } from "react-redux";

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td className="tableDataRow">One</td>
        <td className="tableDataRow">Two</td>
        <td className="tableDataRow">Three</td>
        <td className="tableDataRow">Four</td>
        <td className="tableDataRow">Five</td>
        <td className="tableDataRow">Six</td>
        <td className="tableDataRow">Seven</td>
        <td className="tableDataRow">Eight</td>
      </tr>
    );
  }
}

export default connect()(TableRow);
