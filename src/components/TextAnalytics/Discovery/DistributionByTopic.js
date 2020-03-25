import React, { Component, Fragment } from "react";
import { Col } from "antd";

import DescTitle from "components/shared/DescTitle";
import { HorizontalBar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";

const products = [
  "Consumer Loan",
  "Bank account or service",
  "Credit card",
  "Credit card or prepaid card",
  "Debt collection",
  "Mortgage"
];

const data = {
  type: "horizontalBar",
  labels: products,
  datasets: [
    {
      label: "# of Votes 1",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red
      ]
      //   borderColor: [
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)"
      //   ],
      //   borderWidth: 2
    },
    {
      label: "# of Votes 2",
      data: [15, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow
      ]
    },
    {
      label: "# of Votes 3",
      data: [15, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.greenr
      ]
    }
  ]
};

export default class DistributionByTopic extends Component {
  render() {
    return (
      <Fragment>
        <Col xl={24}>
          <DescTitle
            style={{ fontSize: 15, paddingTop: 10, paddingBottom: 15 }}
          >
            NPS distribution by Products
          </DescTitle>
        </Col>
        <Col xl={24}>
          <HorizontalBar
            height={180}
            options={{
              tooltips: {
                enabled: true // to hide tooltips
              },
              legend: {
                position: "bottom"
                //   display: false
              },
              scales: {
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      // display: false //this will remove only the label
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ],
                yAxes: [
                  {
                    stacked: true,
                    ticks: {
                      // display: false //this will remove only the label
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ]
              },
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  // display: "auto",
                  display: false,
                  align: "center",
                  anchor: "end",
                  color: "#000",
                  font: {
                    size: 12
                  },
                  formatter: (value, ctx) => {
                    // let sum = 0;
                    // let dataArr = ctx.chart.data.datasets[0].data;
                    // dataArr.map(data => {
                    //   sum += data;
                    // });
                    // let percentage = ((value * 100) / sum).toFixed(2) + "%";
                    return `${value}%`;
                  }
                }
              }
            }}
            data={data}
          />
        </Col>
      </Fragment>
    );
  }
}
