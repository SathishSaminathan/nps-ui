import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

export default class BarChart extends Component {
  handleClick = (e, array) => {
    console.log(e, array);
  };
  render() {
    const { title, data } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <HorizontalBar
          data={data}
          //   width={100}
          height={"500%"}
          options={{
            
            maintainAspectRatio: false,
            onClick: this.handleClick,
            legend: {
              position: "right" // place legend on the right side of chart
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  stacked: true // this should be set to make the bars stacked
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  stacked: true // this should be set to make the bars stacked
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
