import React, { Component } from "react";
import { connect } from "react-redux";
import TSLineD3 from "../../d3/TSLineD3";

class ChartTSLine extends Component {
  componentDidMount() {
    this.setState({
      TSLineChart: new TSLineD3(this.refs.TSLineChart, this.props.fullScoreObj)
    });
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj } = this.props;
    if (this.checkSameArray(fullScoreObj, prevProps.fullScoreObj))
      this.state.TSLineChart.update(fullScoreObj);
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
    return <div ref="TSLineChart" className="TSLineChartArea"></div>;
  }
}

const mapState = state => {
  return {
    fullScoreObj: state.score.fullScoreObj
  };
};

export default connect(mapState)(ChartTSLine);
