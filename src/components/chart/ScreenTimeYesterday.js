import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

class ScreenTimeYesterday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [
          `Hours Worked : ${this.props.yesterdaysScreenHours}`,
          "Yesterday"
        ],
        datasets: [
          {
            backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
            data: [
              this.props.yesterdaysScreenHours,
              24 - this.props.yesterdaysScreenHours
            ]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        labels: [
          `Hours Worked: ${this.props.yesterdaysScreenHours}`,
          "Yesterday"
        ],
        datasets: [
          {
            backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
            data: [
              this.props.yesterdaysScreenHours,
              24 - this.props.yesterdaysScreenHours
            ]
          }
        ]
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { yesterdaysScreenHours } = this.props;

    if (yesterdaysScreenHours !== prevProps.yesterdaysScreenHours) {
      this.setState({
        data: {
          labels: [
            `Hours Worked: ${this.props.yesterdaysScreenHours}`,
            "Yesterday"
          ],
          datasets: [
            {
              backgroundColor: ["rgba(0,204,153,1)", "rgba(255,153,51,1)"],
              data: [
                this.props.yesterdaysScreenHours,
                24 - this.props.yesterdaysScreenHours
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
        <Doughnut
          options={{
            title: {
              display: true,
              text: "Working Time Yesterday"
            },
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default ScreenTimeYesterday;
