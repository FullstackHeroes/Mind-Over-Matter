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
            barPercentage: 0.5,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 40 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
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
            barPercentage: 0.5,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 40 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
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
              barPercentage: 0.5,
              backgroundColor: function(context) {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value > 40 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
              },
              data: [this.props.weeksScreenHours]
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
            responsive: true,
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default ScreenTimeWeek;
