import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

class ScreenTimeToday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [
          `Hours Worked: ${(this.props.todaysScreenHours / 60).toFixed(2)}`,
          "Today"
        ],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 255, 0, 0.75)",
              "rgba(255, 0, 255, 0.75)"
            ],
            data: [
              (this.props.todaysScreenHours / 60).toFixed(2),
              24 - (this.props.todaysScreenHours / 60).toFixed(2)
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
          `Hours Worked: ${(this.props.todaysScreenHours / 60).toFixed(2)}`,
          "Today"
        ],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 255, 0, 0.75)",
              "rgba(255, 0, 255, 0.75)"
            ],
            data: [
              (this.props.todaysScreenHours / 60).toFixed(2),
              24 - (this.props.todaysScreenHours / 60).toFixed(2)
            ]
          }
        ]
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { todaysScreenHours } = this.props;

    if (todaysScreenHours !== prevProps.todaysScreenHours) {
      this.setState({
        data: {
          labels: [
            `Hours Worked: ${(this.props.todaysScreenHours / 60).toFixed(2)}`,
            "Today"
          ],
          datasets: [
            {
              backgroundColor: [
                "rgba(0, 255, 0, 0.75)",
                "rgba(255, 0, 255, 0.75)"
              ],
              data: [
                (this.props.todaysScreenHours / 60).toFixed(2),
                24 - (this.props.todaysScreenHours / 60).toFixed(2)
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
              text: "Working Time Today"
            },
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default ScreenTimeToday;
