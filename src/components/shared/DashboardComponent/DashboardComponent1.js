import React, { Component, Fragment } from "react";
import { Row, Col, DatePicker, Button, Slider } from "antd";

import "./dashboard1.scss";
import Label from "../Label";
import { SelectComponent } from "../SelectComponent";
import Loader from "../Loader";
import { Doughnut, Bar } from "react-chartjs-2";

const { RangePicker } = DatePicker;

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

const marks = {
  100: {
    style: {
      color: "#f22f7e"
    },
    label: <strong>100</strong>
  },
  999999: {
    style: {
      color: "#f22f7e"
    },
    label: <strong>999999</strong>
  }
};

const data = {
  labels: ["PROMOTERS", "PASSIVES", "DETRACTORS"],
  datasets: [
    {
      data: [20, 50, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const barData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October"
  ],
  datasets: [
    {
      label: "Happy",
      backgroundColor: "#79c447",
      data: [65, 59, 80, 81, 56, 55, 51, 80, 90, 100]
    },
    {
      label: "Un Happy",
      backgroundColor: "#f5222d",
      data: [65, 59, 80, 81, 56, 55, 51, 80, 90, 100]
    }
  ]
};

export default class DashboardComponent1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsDataFetched: true
    };
  }

  renderCharts = () => {
    return ["Promoters", "Passives", "Dectractors"].map((name, i) => (
      <Col
        key={i}
        xl={24}
        style={{
          height: 270,
          // backgroundColor: "red",
          marginTop: 20
        }}
      >
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col xl={2} style={{ textAlign: "center" }}>
            <Label className={`${name}`} style={{ fontSize: 20 }}>
              {name}
            </Label>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Product Proportion</Label>
              </Col>
              <Col xl={24}>
                <Doughnut
                  data={data}
                  legend={false}
                  height={200}
                  options={{
                    plugins: {
                      datalabels: {
                        // display: true,
                        align: "center",
                        anchor: "center",
                        color: "#000",
                        font: {
                          size: 15
                        },
                        formatter: (value, ctx) => {
                          return `${value}%`;
                        }
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Themes Proportion</Label>
              </Col>
              <Col xl={24}>
                <Doughnut
                  data={data}
                  legend={false}
                  height={200}
                  options={{
                    plugins: {
                      datalabels: {
                        // display: true,
                        align: "center",
                        anchor: "center",
                        color: "#000",
                        font: {
                          size: 15
                        },
                        formatter: (value, ctx) => {
                          return `${value}%`;
                        }
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Customer Satisfaction</Label>
              </Col>
              <Col xl={24}>
                <Bar
                  data={barData}
                  // legend={false}
                  height={200}
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
                          },
                          ticks: {
                            fontColor: "black",
                            fontSize: 8
                          }
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
                          },
                          ticks: {
                            fontColor: "black",
                            fontSize: 8
                          }
                        }
                      ]
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4} style={{ textAlign: "center" }}>
            <p className="noMar">
              <Label>1000</Label> of customers
            </p>
            <p className="noMar">
              <Label>$10000</Label>
            </p>
          </Col>
        </Row>
      </Col>
    ));
  };

  render() {
    const { IsDataFetched } = this.state;
    return (
      <Row style={{ position: "relative", height: "100%" }}>
        {!IsDataFetched && <Loader />}
        <Row style={{ height: "100%" }}>
          <Col xl={24}>
            <Col className="topContainer">
              <Row className="headerArea" style={{ marginBottom: 0 }}>
                <Col className="header">
                  Neptune & Strategie Assignment tool
                </Col>
              </Row>
            </Col>
          </Col>
          <Col xl={24} style={{ marginTop: 20 }} className="filterArea">
            <Col xl={23} className="filter">
              <Row>
                <Col xl={6} className="item">
                  <Label>Time line</Label>
                  <RangePicker style={{ width: "100%" }}></RangePicker>
                </Col>
                <Col xl={6} className="item">
                  <Label>Value Involved</Label>
                  <Col className="flexCenter">
                    <Slider
                      range
                      style={{ width: "88%" }}
                      step={5}
                      marks={marks}
                      defaultValue={[1000, 100000]}
                      min={100}
                      max={999999}
                      tipFormatter={value => `₹ ${value}`}
                      //   onChange={onChange}
                      //   onAfterChange={onAfterChange}
                    />
                  </Col>
                </Col>
                <Col xl={6} className="item">
                  <Label>Product</Label>
                  <SelectComponent
                    data={products}
                    // handleProductChange={handleChange}
                  />
                </Col>
                <Col xl={6} className="item">
                  <Label>Location</Label>
                  <SelectComponent
                    data={[]}
                    // handleProductChange={handleChange}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col xl={6} className="item">
                  <Label>Themes</Label>
                  <SelectComponent
                    data={[]}
                    // handleProductChange={handleChange}
                  />
                </Col>
                <Col xl={6} className="item">
                  <Label>Sentiments</Label>
                  <SelectComponent
                    data={[]}
                    // handleProductChange={handleChange}
                  />
                </Col>
                <Col
                  xl={3}
                  style={{
                    height: 56,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 5,
                    paddingBottom: 0
                  }}
                >
                  <Button
                    //   style={{ float: "right", marginTop: 10 }}
                    type="primary"
                    className="filterButton"
                    icon="filter"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Filter
                  </Button>
                  <Button
                    style={{ marginLeft: 5 }}
                    type="primary"
                    className="filterButton"
                    icon="reload"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
          <Col xl={24} style={{ padding: 10 }}>
            <Col xl={24} className="chartArea">
              {this.renderCharts()}
            </Col>
          </Col>
        </Row>
      </Row>
    );
  }
}