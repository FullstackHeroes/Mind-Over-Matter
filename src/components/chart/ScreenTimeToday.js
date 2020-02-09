import React, { Component } from "react";
import Chart from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

class ScreenTimeToday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ["Hours Today"],
        datasets: [
          {
            label: "Hours Today",
            backgroundColor: "rgba(0, 255, 0, 0.75)",
            data: [this.props.todaysScreenMins]
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <Bar
          options={{
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default ScreenTimeToday;
