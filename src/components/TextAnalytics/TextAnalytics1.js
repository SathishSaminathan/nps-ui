import React, { Component } from "react";
import { Row, Col, Radio } from "antd";
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
      data: [11.1, 9.4, 5.1, 12.2, 9.3, 11.8, 5.7, 4.7, 6.4]
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
      data: [10.8, 14.3, 10.9, 8.7, 8.9, 6.3, 5.6, 6.6, 5.0]
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
      data: [19.6, 11.0, 8.3, 6.6, 7.2, 4.9, 7.7, 6.4, 5.8]
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
      data: [14.3, 12.0, 8.6, 8.6, 8.3, 6.9, 6.4, 6.1, 5.6]
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
      data: [27.7, 26.6, 6.1, 5.1, 4.9, 4.3, 3.6, 3.5, 3.3]
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
      data: [17.3, 21.6, 3.3, 5.7, 8.8, 1.7, 6.7, 4.5, 2.2]
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
      data: [25.4, 22.5, 4.1, 8.5, 6.5, 2.5, 5.7, 3.4, 2.6]
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
      data: [27.4, 26.2, 5.9, 5.3, 4.7, 4.5, 3.6, 3.4, 2.8]
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

class DummyFilter extends Component {
  render() {
    return (
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ paddingTop: 20 }}
      >
        <Col xl={20}>
          <Col style={{ marginBottom: 10 }}>
            <Row>
              <Col>
                <span className="label">Brand</span>
              </Col>
              <Col>
                <Radio.Group
                  defaultValue="Both"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 10
                  }}
                  // onChange={e => handleChange(e.target.value, "Gender")}
                >
                  <Radio value={"Male"}>(All)</Radio>
                  <Radio value={"Female"}>AMI</Radio>
                  <Radio value={"Both"}>NAC</Radio>
                  <Radio value={"State"}>STATE</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    );
  }
}

class ChartComponent extends Component {
  render() {
    const { data, needPadding } = this.props;
    const ticks = needPadding ? { padding: 0 } : {};
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
                ticks,
                gridLines: {
                  display: false
                }
              }
            ]
          },
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: "auto",
              align: "start",
              anchor: "end",
              color: "#000",
              font: {
                size: 12
              }
              // formatter: (value, ctx) => {
              //   // let sum = 0;
              //   // let dataArr = ctx.chart.data.datasets[0].data;
              //   // dataArr.map(data => {
              //   //   sum += data;
              //   // });
              //   // let percentage = ((value * 100) / sum).toFixed(2) + "%";
              //   return `${value}%`;
              // }
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
        <Col xl={20}>
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
                    <ChartComponent needPadding data={barChartData1} />
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
        <Col xl={4}>
          <DummyFilter />
        </Col>
      </Row>
    );
  }
}
