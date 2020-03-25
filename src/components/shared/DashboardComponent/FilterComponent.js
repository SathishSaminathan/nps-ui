import React, { Component } from "react";
import { Row, Col, DatePicker, Button, Slider, Tabs } from "antd";
import { isEqual } from "lodash";
import { Doughnut, Bar, Pie, Bubble } from "react-chartjs-2";
import "./dashboard1.scss";
import Label from "../Label";
import { SelectComponent } from "../SelectComponent";
import Loader from "../Loader";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import moment from "moment";
import FilterChartComponent from "./FilterChartComponent";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

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

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsDataFetched: true,
      Response: null,
      States: [],
      Sentiments: [],
      Products: [],
      Themes: [],
      SummaryResponse: [],
      VOCResponse: [],
      InitialFetched: false,
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

  handleFilterInputs = (value, type) => {
    this.setState({
      FilterData: {
        ...this.state.FilterData,
        [type]: value || null
      }
    });
  };

  handleFilter = () => {
    this.getChartData(this.state.FilterData);
  };

  componentDidMount() {
    this.getDDLists();
    const { FilterData } = this.state;
    this.getChartData(FilterData);
    this.getChartSummary();
    this.getSpeedometerValue();
    this.getVOCChart();
  }

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

  getChartData = FilterData => {
    this.setState(
      {
        IsDataFetched: false
      },
      () => console.log(this.state.IsDataFetched)
    );
    this.dashboardAPI
      .service(DashboardVariables.GET_DASHBOARD_DATA, FilterData)
      .then(res => {
        this.setState({
          Response: Object.values(res.data),
          IsDataFetched: true,
          InitialFetched: this.state.InitialFetched ? false : true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleReset = () => {
    this.setState(
      {
        FilterData: {
          Product: null,
          State: null,
          Sentiment: null,
          Timeline: null,
          ValueInvolved: [],
          Theme: null
        }
      },
      () => this.getChartData(this.state.FilterData)
    );
  };
  render() {
    const {
      IsDataFetched,
      States,
      Products,
      Sentiments,
      Themes,
      InitialFetched,
      SummaryResponse,
      VOCResponse,
      NPS,
      CSAT,
      CES,
      FilterData: { Timeline, Sentiment, State, Product, ValueInvolved, Theme }
    } = this.state;
    return (
      <>
        {!IsDataFetched && <Loader />}
        <Row>
          <Col xl={24} className="filterArea">
            <Col xl={24} className="filter">
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
                  {(Timeline ||
                    Sentiment ||
                    State ||
                    Product ||
                    ValueInvolved.length !== 0 ||
                    Theme) && (
                    <Button
                      style={{ marginLeft: 5 }}
                      type="primary"
                      className="filterButton"
                      icon="reload"
                      onClick={this.handleReset}
                    >
                      Reset
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Col>
          {this.state.Response && (
            <Col xl={24} style={{ padding: 10, marginTop: 10 }}>
              <Col xl={24} className="chartArea">
                <FilterChartComponent res={this.state.Response} />
              </Col>
            </Col>
          )}
        </Row>
      </>
    );
  }
}
