import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";

const data = {
  type: "horizontalBar",
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: Colors.primaryThemeColor,
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 0,
      //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //   hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My second dataset",
      backgroundColor: Colors.primaryButtonColor,
      borderColor: "rgba(255,99,132,1)",
      //   borderWidth: 1,
      //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //   hoverBorderColor: "rgba(255,99,132,1)",
      data: [35, 59, 70, 61, 26, 85, 29]
    }
  ]
};

export default class BarChart extends Component {
  handleClick = (e, array) => {
    console.log(e, array);
  };
  render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <HorizontalBar
          data={data}
          //   width={100}
          height={500}
          options={{
            maintainAspectRatio: false,
            onClick: this.handleClick
          }}
          //   onElementsClick={e => console.log(e)}
        />
      </div>
    );
  }
}
