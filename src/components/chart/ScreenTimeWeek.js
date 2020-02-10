import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

class ScreenTimeWeek extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [`Hours Worked : ${this.props.weeksScreenHours}`],
        datasets: [
          {
            backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
            data: [this.props.weeksScreenHours]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        labels: [`Hours Worked: ${this.props.weeksScreenHours}`],
        datasets: [
          {
            backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
            data: [this.props.weeksScreenHours]
          }
        ]
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { weeksScreenHours } = this.props;

    if (weeksScreenHours !== prevProps.weeksScreenHours) {
      this.setState({
        data: {
          labels: [`Hours Worked: ${this.props.weeksScreenHours}`],
          datasets: [
            {
              backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
              data: [
                this.props.weeksScreenHours,
                24 - this.props.weeksScreenHours
              ]
            }
          ]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Bar
          options={{
            title: {
              display: true,
              text: "Working Time This Week"
            },
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default ScreenTimeWeek;
