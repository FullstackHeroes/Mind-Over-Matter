import React, { Component } from "react";
import RSLineD3 from "../../d3/RSLineD3";

class ChartRSLine extends Component {
  componentDidMount() {
    this.setState({
      RSLineChart: new RSLineD3(this.refs.RSLineChart, this.props.runningScore)
    });
  }

  componentDidUpdate(prevProps) {
    const { runningScore } = this.props;
    if (this.checkSameArray(runningScore, prevProps.runningScore))
      this.state.RSLineChart.update(runningScore);
  }

  checkSameArray(one, two) {
    if (one.length !== two.length) return true;
    for (let i = 0; i < one.length; i++) {
      const oneObj = one[i],
        twoObj = two[i];
      if (!oneObj || !twoObj) return true;
      const oneKeys = Object.keys(oneObj),
        twoKeys = Object.keys(twoObj),
        oneVals = Object.values(oneObj),
        twoVals = Object.values(twoObj);
      if (oneKeys.length !== twoKeys.length) return true;
      for (let j = 0; j < oneKeys.length; j++) {
        const oneKey = oneKeys[j],
          twoKey = twoKeys[j],
          oneVal = oneVals[j],
          twoVal = twoVals[j];
        if (oneKey !== twoKey || oneVal !== twoVal) return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div ref="RSLineChart" className="RSLineChartArea chartWrapDiv"></div>
    );
  }
}

export default ChartRSLine;
