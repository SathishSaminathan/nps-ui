import React, { Component, Fragment } from "react";
import { Row, Col, DatePicker, Button, Slider, Tabs, Rate } from "antd";
import ReactSpeedometer from "react-d3-speedometer";
import { FaEuroSign, FaDonate, FaUserEdit } from "react-icons/fa";
import { WiDaySunny, WiTime9 } from "react-icons/wi";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiBracers } from "react-icons/gi";
import { Doughnut, Bar, Pie, Bubble } from "react-chartjs-2";

import "./dashboard1.scss";
import Label from "../Label";
import { SelectComponent } from "../SelectComponent";
import Loader from "../Loader";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import moment from "moment";
import FilterComponent from "./FilterComponent";
import { Images } from "assets/images";
import ComparisionChart from "./ComparisionChart";
import ChurnPrediction from "./ChurnPrediction";

const { TabPane } = Tabs;
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
      SummaryResponse: [],
      VOCResponse: [],
      NPS: 0,
      CSAT: 0,
      CES: 0,
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

  getSpeedometerValue = () => {
    Promise.all([
      this.dashboardAPI.service(DashboardVariables.GET_SPEEDOMETER, "NPS"),
      this.dashboardAPI.service(DashboardVariables.GET_SPEEDOMETER, "CSAT"),
      this.dashboardAPI.service(DashboardVariables.GET_SPEEDOMETER, "CES")
    ])
      .then(([res1, res2, res3]) => {
        this.setState({
          NPS: res1.data.value,
          CSAT: res2.data.value,
          CES: res3.data.value
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  componentDidMount() {
    this.getDDLists();
    const { FilterData } = this.state;
    this.getChartSummary();
    this.getSpeedometerValue();
    this.getVOCChart();
    // Promise.all([
    //   this.getFeedbackService("QUALITY"),
    //   this.getFeedbackService("PRICE"),
    //   this.getFeedbackService("DESIGN"),
    //   this.getFeedbackService("SERVICE")
    // ])
    //   .then(([res1, res2, res3, res4]) => {
    //     debugger;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  getFeedbackService = type => {
    return this.dashboardAPI.service(DashboardVariables.FEEDBACK_SERVICE, type);
  };

  getChartSummary = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_CHART_SUMMARY)
      .then(res => {
        this.setState({
          SummaryResponse: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getVOCChart = () => {
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

  render() {
    const configImage = {
      1: Images.Smiley1,
      2: Images.Smiley2,
      3: Images.Smiley3,
      4: Images.Smiley4,
      5: Images.Smiley5
    };
    const {
      IsDataFetched,
      States,
      Products,
      Sentiments,
      Themes,
      SummaryResponse,
      VOCResponse,
      NPS,
      CSAT,
      CES,
      FilterData: { Timeline, Sentiment, State, Product, ValueInvolved, Theme }
    } = this.state;

    const desc = ["terrible", "bad", "normal", "good", "wonderful"].reverse();

    return (
      <Row style={{ position: "relative", height: "100%" }}>
        {SummaryResponse.length === 0 && VOCResponse.length === 0 && <Loader />}
        <Row style={{ height: "100%" }}>
          <Col xl={24}>
            <Col className="topContainer">
              <Row className="headerArea" style={{ marginBottom: 0 }}>
                <Col className="header">
                  Neptune & Strategic Assignment tool
                </Col>
              </Row>
            </Col>
          </Col>
          <Col xl={24} style={{ paddingTop: 10 }}>
            <Tabs className="custTab" defaultActiveKey="2">
              <TabPane tab="Satellite" key="1">
                <Row>
                  <Col xl={24} style={{ marginTop: 10, padding: 20 }}>
                    <Col xl={8} className="">
                      <Col xl={23} className="card containerStyle">
                        <Label style={{ marginBottom: 20 }}>NPS(1-10)</Label>
                        <ReactSpeedometer
                          value={NPS}
                          height={120}
                          width={190}
                          ringWidth={20}
                          customSegmentStops={[0, 3, 6, 10]}
                          segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                          minValue={0}
                          maxValue={10}
                          needleTransitionDuration={4000}
                          needleTransition="easeElastic"
                        />
                      </Col>
                    </Col>
                    <Col xl={8} className="">
                      <Col xl={23} className="card containerStyle">
                        <Label style={{ marginBottom: 20 }}>CSAT (1-5)</Label>
                        <ReactSpeedometer
                          value={2.6}
                          height={120}
                          width={190}
                          ringWidth={20}
                          customSegmentStops={[0, 1.5, 3.5, 5]}
                          segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                          minValue={0}
                          maxValue={5}
                          needleTransitionDuration={5000}
                          needleTransition="easeElastic"
                        />
                      </Col>
                    </Col>
                    <Col xl={8} className="">
                      <Col xl={23} className="card containerStyle">
                        <Label style={{ marginBottom: 20 }}>CES(1-10)</Label>
                        <ReactSpeedometer
                          value={CES}
                          height={120}
                          width={190}
                          ringWidth={20}
                          customSegmentStops={[0, 3, 6, 10]}
                          segmentColors={["#ff6384", "#ffce56", "#79c447"]}
                          minValue={0}
                          maxValue={10}
                          needleTransitionDuration={6000}
                          needleTransition="easeElastic"
                        />
                      </Col>
                    </Col>
                  </Col>
                  <Col xl={24} style={{ padding: 20 }}>
                    <Col xl={24} className="">
                      <Col xl={8}>
                        <Col xl={23} className="card">
                          <Col style={{ marginBottom: 10 }}>
                            <Label>NPS Category by Count of calls</Label>
                          </Col>
                          {SummaryResponse.length !== 0 && (
                            <Doughnut
                              data={this.getRandomColors(
                                SummaryResponse,
                                "DOUGHNUT"
                              )}
                              legend={false}
                              height={250}
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
                          )}
                        </Col>
                      </Col>
                      <Col xl={16} className="card">
                        <Label style={{ marginBottom: 20 }}>VOC</Label>
                        {VOCResponse.length !== 0 && (
                          <Bar
                            data={this.getRandomColors(VOCResponse, "BAR")}
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
                        )}
                      </Col>
                    </Col>
                  </Col>
                  <Col xl={24} style={{ padding: 5 }}>
                    <Col xl={6} className="feedbackCardContainer">
                      <Col xl={24} className="feedbackCard">
                        <Row style={{ height: "100%" }}>
                          <Col className="feedbackCardHead">
                            <p className="title">Quality</p>
                            <p className="desc">
                              How do you evaluate the quality of the Product?
                            </p>
                          </Col>
                          <Col className="feedbackCardBody">
                            <div className="smileyContainer">
                              {[18.77, 13.38, 9.97, 10.96, 46.92].map(
                                (value, i) => (
                                  <div className="smileyRow">
                                    <div className="value">{value}%</div>
                                    <img src={configImage[i + 1]} />
                                  </div>
                                )
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                    <Col xl={6} className="feedbackCardContainer">
                      <Col xl={24} className="feedbackCard">
                        <Row style={{ height: "100%" }}>
                          <Col className="feedbackCardHead">
                            <p className="title">Pricing</p>
                            <p className="desc">
                              what do you think about the price of the product?
                            </p>
                          </Col>
                          <Col className="feedbackCardBody">
                            <div className="smileyContainer">
                              <div className="pricingRow">
                                <div className="value">{18}%</div>
                                <FaDonate className="icon" />
                                <div className="desc">Top Expensive</div>
                              </div>
                              <div className="pricingRow">
                                <div className="value">{18}%</div>
                                <AiFillDollarCircle className="icon" />
                                <div className="desc">Just right</div>
                              </div>
                              <div className="pricingRow">
                                <div className="value">{63}%</div>
                                <FaEuroSign className="icon" />
                                <div className="desc">Top Cheap</div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                    <Col xl={6} className="feedbackCardContainer">
                      <Col xl={24} className="feedbackCard">
                        <Row style={{ height: "100%" }}>
                          <Col className="feedbackCardHead">
                            <p className="title">Design</p>
                            <p className="desc">
                              How do you evaluate the design of the Product
                            </p>
                          </Col>
                          <Col className="feedbackCardBody">
                            <div className="designRow">
                              <div className="desc">
                                <span>75%</span> liked the product design.
                              </div>
                              <div className="desc">
                                <span>75%</span> think is fits with the brand.
                              </div>
                              <div className="desc">
                                <span>75%</span> think its appealing.
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                    <Col xl={6} className="feedbackCardContainer">
                      <Col xl={24} className="feedbackCard">
                        <Row style={{ height: "100%" }}>
                          <Col className="feedbackCardHead">
                            <p className="title">Service</p>
                            <p className="desc">
                              How do you evaluate the performance of our team?
                            </p>
                          </Col>
                          <Col
                            className="feedbackCardBody"
                            style={{ flexDirection: "column" }}
                          >
                            <div className="serviceRow">
                              <WiDaySunny className="icon" />
                              <div>Friendly</div>
                              <Rate
                                className="custRate"
                                tooltips={desc}
                                disabled
                                value={3}
                              />
                            </div>
                            <div className="serviceRow">
                              <FaUserEdit className="icon" />
                              <div>Customize</div>
                              <Rate
                                className="custRate"
                                tooltips={desc}
                                disabled
                                value={3}
                              />
                            </div>
                            <div className="serviceRow">
                              <GiBracers className="icon" />
                              <div>Competent</div>
                              <Rate
                                className="custRate"
                                tooltips={desc}
                                disabled
                                value={3}
                              />
                            </div>
                            <div className="serviceRow">
                              <WiTime9 className="icon" />
                              <div>Short wait</div>
                              <Rate
                                className="custRate"
                                tooltips={desc}
                                disabled
                                value={3}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Rover" key="2">
                <ComparisionChart />
              </TabPane>
              <TabPane tab="Astronaut" key="3">
                <FilterComponent />
              </TabPane>
              <TabPane tab="Prediction" key="4">
                <ChurnPrediction />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Row>
    );
  }
}
