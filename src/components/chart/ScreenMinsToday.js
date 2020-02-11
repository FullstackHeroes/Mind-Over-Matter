import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut, HorizontalBar } from "react-chartjs-2";

class ScreenMinsToday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [`Mins Worked : ${this.props.todaysScreenMins}`],
        datasets: [
          {
            barPercentage: 0.6,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
            data: [this.props.todaysScreenMins]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        labels: [`Mins Worked : ${this.props.todaysScreenMins}`],
        datasets: [
          {
            barPercentage: 0.6,
            backgroundColor: function(context) {
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
            },
            data: [this.props.todaysScreenMins]
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
            `Mins Worked : ${
              this.props.todaysScreenMins
                ? this.props.todaysScreenMins.toFixed(2)
                : 0
            }`
          ],
          datasets: [
            {
              barPercentage: 0.6,
              backgroundColor: function(context) {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value > 480 ? "rgba(255,51,51,1)" : "rgba(0,204,153,1)";
              },
              data: [this.props.todaysScreenMins]
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

export default ScreenMinsToday;
