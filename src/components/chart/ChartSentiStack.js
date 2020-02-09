import React, { Component } from "react";
import SentiStackD3 from "../../d3/SentiStackD3";

class ChartSentiStack extends Component {
  componentDidMount() {
    this.setState({
      SentiStackChart: new SentiStackD3(
        this.refs.SentiStackChart,
        this.props.fullScoreObj
      )
    });
  }

  componentDidUpdate(prevProps) {
    const { fullScoreObj } = this.props;
    if (this.checkSameArray(fullScoreObj, prevProps.fullScoreObj))
      this.state.SentiStackChart.update(fullScoreObj);
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
      <div
        ref="SentiStackChart"
        className="SentiStackChartArea chartWrapDiv"></div>
    );
  }
}

export default ChartSentiStack;
