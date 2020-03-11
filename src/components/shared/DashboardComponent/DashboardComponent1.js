import React, { Component, Fragment } from "react";
import { Row, Col, DatePicker, Button, Slider } from "antd";
import ReactSpeedometer from "react-d3-speedometer";
import { Doughnut, Bar, Pie, Bubble } from "react-chartjs-2";

import "./dashboard1.scss";
import Label from "../Label";
import { SelectComponent } from "../SelectComponent";
import Loader from "../Loader";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import moment from "moment";

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

const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};
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

const bubbleData = {
  labels: ["January"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{ x: 10, y: 20, r: 50 }]
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
      IsDataFetched: true,
      Response: [],
      States: [],
      Sentiments: [],
      Products: [],
      Themes: [],
      FilterData: {
        Product: null,
        State: null,
        Sentiment: null,
        Timeline: null,
        ValueInvolved: [],
        Theme: null
      }
    };
    this.dashboardAPI = new DashboardServices();
  }

  getDDLists = () => {
    Promise.all([
      this.dashboardAPI.service(DashboardVariables.GET_PRODUCTS),
      this.dashboardAPI.service(DashboardVariables.GET_STATES),
      this.dashboardAPI.service(DashboardVariables.GET_SENTIMENT),
      this.dashboardAPI.service(DashboardVariables.GET_THEMES)
    ])
      .then(([res1, res2, res3, res4]) => {
        this.setState({
          Products: res1.data,
          States: res2.data,
          Sentiments: res3.data,
          Themes: res4.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFilterInputs = (value, type) => {
    this.setState({
      FilterData: {
        ...this.state.FilterData,
        [type]: value || null
      }
    });
  };

  handleFilter = () => {
    console.log("FilterData", this.state.FilterData);
  };

  componentDidMount() {
    this.getDDLists();
    this.dashboardAPI
      .service(DashboardVariables.GET_DASHBOARD_DATA)
      .then(res => {
        this.setState({
          Response: Object.values(res.data)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRandomColors = (data, type) => {
    switch (type) {
      case "DOUGHNUT":
        data.datasets[0].backgroundColor = data.datasets[0].data.map(
          datum => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
        return data;

      case "PIE":
        data.datasets[0].backgroundColor = data.datasets[0].data.map(
          datum => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
        return data;

      case "BAR":
        data.datasets[0].backgroundColor = "#79c447";
        data.datasets[1].backgroundColor = "#f5222d";
        return data;

      default:
        break;
    }
  };

  renderCharts = () => {
    const { Response } = this.state;
    return Response.map((res, i) => (
      <Col
        key={i}
        xl={24}
        style={{
          height: 270,
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
            <Label className={`${res.npsState}`} style={{ fontSize: 20 }}>
              {res.npsState}
            </Label>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Product Proportion</Label>
              </Col>
              <Col xl={24}>
                <Doughnut
                  data={this.getRandomColors(res.productChart, "DOUGHNUT")}
                  legend={false}
                  height={200}
                  options={{
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                    // plugins: {
                    //   datalabels: {
                    //     // display: true,
                    //     align: "center",
                    //     anchor: "center",
                    //     color: "#000",
                    //     font: {
                    //       size: 15
                    //     },
                    //     formatter: (value, ctx) => {
                    //       return `${value}%`;
                    //     }
                    //   }
                    // }
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
                <Pie
                  data={this.getRandomColors(res.issueChart, "PIE")}
                  legend={false}
                  height={200}
                  options={{
                    plugins: {
                      datalabels: {
                        display: false
                        // align: "center",
                        // anchor: "center",
                        // color: "#000",
                        // font: {
                        //   size: 15
                        // },
                        // formatter: (value, ctx) => {
                        //   return `${value}%`;
                        // }
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
                  data={this.getRandomColors(res.sentimentChart, "BAR")}
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
              <Label>{res.customerCount ? res.customerCount : 0}</Label> of
              customers
            </p>
            <p className="noMar">
              <Label>₹{res.totalAmount ? res.totalAmount : 0}</Label>
            </p>
          </Col>
        </Row>
      </Col>
    ));
  };

  handleReset = () => {
    this.setState({
      FilterData: {
        Product: null,
        State: null,
        Sentiment: null,
        Timeline: null,
        ValueInvolved: [],
        Theme: null
      }
    });
  };

  render() {
    const {
      IsDataFetched,
      States,
      Products,
      Sentiments,
      Themes,
      FilterData: { Timeline, Sentiment, State, Product, ValueInvolved, Theme }
    } = this.state;
    console.log("Timeline", Timeline);
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
                  <RangePicker
                    style={{ width: "100%" }}
                    onChange={(dates, dateStrings) =>
                      this.handleFilterInputs(dateStrings, "Timeline")
                    }
                    value={
                      Timeline
                        ? [
                            moment(Timeline[0], "DD-YY-YYYY"),
                            moment(Timeline[1], "DD-YY-YYYY")
                          ]
                        : null
                    }
                    ranges={{
                      Today: [moment(), moment()],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month")
                      ]
                    }}
                    format={"DD-MM-YYYY"}
                  ></RangePicker>
                </Col>
                <Col xl={6} className="item">
                  <Label>Value Involved</Label>
                  <Col className="flexCenter">
                    <Slider
                      range
                      style={{ width: "88%" }}
                      step={5}
                      marks={marks}
                      defaultValue={ValueInvolved}
                      value={ValueInvolved}
                      min={100}
                      max={999999}
                      tipFormatter={value => `₹ ${value}`}
                      onChange={value =>
                        this.handleFilterInputs(value, "ValueInvolved")
                      }
                      //   onChange={onChange}
                      //   onAfterChange={onAfterChange}
                    />
                  </Col>
                </Col>
                <Col xl={6} className="item">
                  <Label>Product</Label>
                  <SelectComponent
                    data={Products}
                    defaultValue={Product}
                    value={Product}
                    handleProductChange={this.handleFilterInputs}
                    field="Product"
                  />
                </Col>
                <Col xl={6} className="item">
                  <Label>Location</Label>
                  <SelectComponent
                    data={States}
                    defaultValue={State}
                    value={State}
                    handleProductChange={this.handleFilterInputs}
                    field="State"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col xl={6} className="item">
                  <Label>Themes</Label>
                  <SelectComponent
                    data={Themes}
                    defaultValue={Theme}
                    value={Theme}
                    handleProductChange={this.handleFilterInputs}
                    field="Theme"
                  />
                </Col>
                <Col xl={6} className="item">
                  <Label>Sentiments</Label>
                  <SelectComponent
                    data={Sentiments}
                    defaultValue={Sentiment}
                    value={Sentiment}
                    handleProductChange={this.handleFilterInputs}
                    field="Sentiment"
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
                    onClick={this.handleFilter}
                  >
                    Filter
                  </Button>
                  <Button
                    style={{ marginLeft: 5 }}
                    type="primary"
                    className="filterButton"
                    icon="reload"
                    onClick={this.handleReset}
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
          <Col xl={24} style={{ padding: 10 }}>
            <Col xl={24} className="masonry-layout">
              <Col className="masonry-layout__panel">
                <Label>NPS Category by Count of calls</Label>
                <Doughnut
                  data={data}
                  legend={false}
                  height={400}
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
                <Label style={{ marginBottom: 20 }}>
                  NPS Category by Count of calls
                </Label>
                <Bubble data={bubbleData} legend={false} height={300} />
              </Col>
              <Col style={{ marginTop: 10 }} className="masonry-layout__panel">
                <Label style={{ marginBottom: 20 }}>NPS(1-10)</Label>
                <ReactSpeedometer
                  value={7}
                  height={200}
                  customSegmentStops={[0, 3, 6, 10]}
                  segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                  minValue={0}
                  maxValue={10}
                  needleTransitionDuration={4000}
                  needleTransition="easeElastic"
                />
              </Col>
              <Col style={{ marginTop: 10 }} className="masonry-layout__panel">
                <Label style={{ marginBottom: 20 }}>CSAT (1-5)</Label>
                <ReactSpeedometer
                  value={4}
                  height={200}
                  customSegmentStops={[0, 1.5, 3.5, 5]}
                  segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                  minValue={0}
                  maxValue={5}
                  needleTransitionDuration={5000}
                  needleTransition="easeElastic"
                />
              </Col>
              <Col style={{ marginTop: 10 }} className="masonry-layout__panel">
                <Label style={{ marginBottom: 20 }}>CES(1-5)</Label>
                <ReactSpeedometer
                  value={4}
                  height={200}
                  customSegmentStops={[0, 1.5, 3.5, 5]}
                  segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                  minValue={0}
                  maxValue={5}
                  needleTransitionDuration={6000}
                  needleTransition="easeElastic"
                />
              </Col>
              <Col style={{ marginTop: 10 }} className="masonry-layout__panel">
                <Label style={{ marginBottom: 20 }}>VOC</Label>
                <Bar
                  data={barData}
                  // legend={false}
                  height={400}
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
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                  }}
                />
              </Col>
            </Col>
          </Col>
        </Row>
      </Row>
    );
  }
}
