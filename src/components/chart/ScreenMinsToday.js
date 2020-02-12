import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut, HorizontalBar } from "react-chartjs-2";

class ScreenMinsToday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [`Minutes Worked : ${this.props.todaysScreenMins.toFixed(2)}`],
        datasets: [
          {
            label: "Mins Worked",
            barPercentage: 0.6,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
            data: [this.props.todaysScreenMins.toFixed(2)]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        labels: [`Minutes Worked : ${this.props.todaysScreenMins.toFixed(2)}`],
        datasets: [
          {
            label: "Mins Worked",
            barPercentage: 0.6,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
            data: [this.props.todaysScreenMins.toFixed(2)]
          }
        ]
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { todaysScreenMins } = this.props;

    if (todaysScreenMins !== prevProps.todaysScreenMins) {
      this.setState({
        data: {
          labels: [
            `Minutes Worked : ${this.props.todaysScreenMins.toFixed(2)}`
          ],
          datasets: [
            {
              label: "Mins Worked",
              barPercentage: 0.6,
              backgroundColor: function(context) {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
              },
              data: [this.props.todaysScreenMins.toFixed(2)]
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
              text: "Minutes Worked Today"
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
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                    padding: 10
                  },
                  max: 1440
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

export default ScreenMinsToday;
