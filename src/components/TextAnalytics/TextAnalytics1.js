import React, { Component } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import { HorizontalBar } from "react-chartjs-2";

import { Colors } from "constants/themeConstants";
import BarChart from "components/shared/Charts/BarChart";

import "./textAnalytics.scss";
import TextServices from "services/textServices";
import { TextAnalyticsVariables } from "constants/APIConstants";
import LineChart from "components/shared/Charts/LineChart";
import response from "./data";
import Filters from "components/Filters";

const products = [
  "Consumer Loan",
  "Bank account or service",
  "Credit card",
  "Credit card or prepaid card",
  "Debt collection",
  "Mortgage",
  "Other financial service",
  "Payday loan",
  "Prepaid card"
];

const products1 = [
  "Prepaid card",
  "Credit card or prepaid card",
  "Consumer Loan",
  "Other financial service",
  "Credit card",
  "Debt collection",
  "Bank account or service",
  "Mortgage",
  "Payday loan"
];

const emptyLabels = ["", "", "", "", "", "", "", "", ""];

const barChartData1 = {
  labels: products,
  datasets: [
    {
      label: "Advocate",
      backgroundColor: Colors.cardColorGreen,
      borderColor: Colors.cardColorGreen,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [100, 59, 80, 81, 56, 55, 79, 10, 30]
    }
  ]
};

const barChartData2 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Detractor",
      backgroundColor: Colors.cardColorPink,
      borderColor: Colors.cardColorPink,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [100, 59, 80, 81, 56, 55, 79, 10, 100]
    }
  ]
};
const barChartData3 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Passive",
      backgroundColor: Colors.cardColorOrange,
      borderColor: Colors.cardColorOrange,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [100, 59, 80, 81, 56, 55, 79, 10, 30]
    }
  ]
};
const barChartData4 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Grand Total",
      backgroundColor: Colors.cardColorBlue,
      borderColor: Colors.cardColorBlue,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [100, 89.6, 66.1, 55.1, 44.9, 44.3, 33.3, 22.1, 11.3]
    }
  ]
};
const negativeBarChartData1 = {
  labels: products1,
  datasets: [
    {
      label: "Advocate",
      backgroundColor: Colors.cardColorGreen,
      borderColor: Colors.cardColorGreen,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [12.7, 9.6, 6.1, 5.1, 4.9, 4.3, 3.3, 2.1, 1.3]
    }
  ]
};

const negativeBarChartData2 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Detractor",
      backgroundColor: Colors.cardColorPink,
      borderColor: Colors.cardColorPink,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [65, 59, 80, 81, 56, 55, 79, 10, 20]
    }
  ]
};
const negativeBarChartData3 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Passive",
      backgroundColor: Colors.cardColorOrange,
      borderColor: Colors.cardColorOrange,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [65, 59, 80, 81, 56, 55, 79, 10, 30]
    }
  ]
};
const negativeBarChartData4 = {
  labels: emptyLabels,
  datasets: [
    {
      label: "Grand Total",
      backgroundColor: Colors.cardColorBlue,
      borderColor: Colors.cardColorBlue,
      borderWidth: 1,
      hoverBackgroundColor: Colors.primaryThemeColor,
      hoverBorderColor: Colors.primaryThemeColor,
      data: [12.7, 9.6, 6.1, 5.1, 4.9, 4.3, 3.3, 2.1, 1.3]
    }
  ]
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class ChartComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <HorizontalBar
        options={{
          tooltips: {
            enabled: false // to hide tooltips
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false //this will remove only the label
                },
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          },
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: true,
              align: "end",
              anchor: "center",
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
    );
  }
}

export default class TextAnalytics1 extends Component {
  constructor(props) {
    super(props);
    this.api = new TextServices();
    this.state = this.emptyState();
  }

  emptyState = () => {
    return {
      textAnalyticsData: null,
      working: false,
      data: [],
      //   barChartData: barChartData,
      //   response: response.Sheet1,
      //   filteredResponse: response.Sheet1,
      //   products: products,
      states: []
    };
  };

  componentDidMount() {}

  render() {
    const { data, barChartData, states } = this.state;
    return (
      <Row>
        <Col xl={18}>
          <Col className="topContainer">
            <Row className="headerArea">
              <Col className="header">Themes by sentiment</Col>
              {/* <Col>
                <div className="top">Top Products</div>
              </Col> */}
            </Row>
            <Row style={{ paddingLeft: 10 }}>
              <Col xl={24}>
                <Row className="label">Negative sentiment themes</Row>
                <Row style={{ height: "50vh" }}>
                  <Col xl={9} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Advocate</Col>
                    </Row>
                    <ChartComponent data={barChartData1} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Detractor</Col>
                    </Row>
                    <ChartComponent data={barChartData2} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Passive</Col>
                    </Row>
                    <ChartComponent data={barChartData3} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Grand Total</Col>
                    </Row>
                    <ChartComponent data={barChartData4} />
                  </Col>
                </Row>
              </Col>
              <Col xl={24} style={{ paddingTop: 40 }}>
                <Row className="label">Positive sentiment themes</Row>
                <Row style={{ height: "50vh" }}>
                  <Col xl={9} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Advocate</Col>
                    </Row>
                    <ChartComponent data={negativeBarChartData1} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Detractor</Col>
                    </Row>
                    <ChartComponent data={negativeBarChartData2} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Passive</Col>
                    </Row>
                    <ChartComponent data={negativeBarChartData3} />
                  </Col>
                  <Col xl={5} style={{ height: "95%" }}>
                    <Row type="flex" justify="end">
                      <Col>Grand Total</Col>
                    </Row>
                    <ChartComponent data={negativeBarChartData4} />
                  </Col>
                </Row>
              </Col>
              <Col>{/* <BarChart data={barChartData} /> */}</Col>
            </Row>
          </Col>
        </Col>
        <Col xl={6}>
          <Filters
            states={states}
            handleFilter={this.handleFilter}
            products={products}
          />
        </Col>
      </Row>
    );
  }
}
