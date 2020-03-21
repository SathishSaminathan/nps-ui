import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { getRandomColors } from "helpers/validationHelpers";

export default class ComparisionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VOCResponse: []
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_VOC)
      .then(res => {
        this.setState({
          VOCResponse: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { VOCResponse } = this.state;
    return (
      VOCResponse.length !== 0 && (
        <Bar
          data={getRandomColors(VOCResponse, "BAR")}
          // legend={false}
          height={110}
          options={{
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    // labelString: "X axe name",
                    fontColor: "#000000",
                    fontSize: 10
                  },
                  gridLines: {
                    display: false
                  }
                  // ticks: {
                  //   fontColor: "black",
                  //   fontSize: 8
                  // }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    // labelString: "Y axe name",
                    fontColor: "#000000",
                    fontSize: 10
                  },
                  gridLines: {
                    display: false
                  }
                  // ticks: {
                  //   fontColor: "black",
                  //   fontSize: 8
                  // }
                }
              ]
            },
            plugins: {
              datalabels: {
                display: false
              }
            }
          }}
        />
      )
    );
  }
}
