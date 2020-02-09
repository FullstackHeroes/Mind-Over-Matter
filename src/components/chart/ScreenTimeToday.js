import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

class ScreenTimeToday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ["Hours Today"],
        datasets: [
          {
            backgroundColor: "rgba(0, 255, 0, 0.75)",
            data: [this.props.todaysScreenMins]
          }
          // {
          //   label: "Today",
          //   backgroundColor: "rgba(255, 0, 255, 0.75)",
          //   data: [24]
          // }
        ]
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { todaysScreenMins } = this.props;

    if (todaysScreenMins !== prevProps.todaysScreenMins) {
      console.log("#######", todaysScreenMins);
    }
  }

  render() {
    return (
      <div>
        <Bar
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
