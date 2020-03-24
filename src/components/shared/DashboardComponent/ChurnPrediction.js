import React, { Component } from "react";
import { Row, Col } from "antd";
import { FaPercent } from "react-icons/fa";
import { MdCloud, MdTimeline, MdShowChart } from "react-icons/md";
import { GiSwapBag, GiChart } from "react-icons/gi";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import Loader from "../Loader";

export default class ChurnPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PredictionResponse: null
    };
    this.dashboardAPI = new DashboardServices();
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.dashboardAPI
      .service(DashboardVariables.PREDICTION)
      .then(res => {
        this.setState({
          PredictionResponse: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderCards = PredictionResponse =>
    PredictionResponse.map((ele, i) => (
      <Col
        className="churnCardContainer"
        onClick={() =>
          this.props.history.push({
            pathname: "/predictionmore",
            state: {
              products: ele.products
            }
          })
        }
      >
        <Col className="churnCard">
          <p className="custCountArea">
            <span className="custCount"># {ele.customerCount} </span> customers
            will leave likely leave us in {ele.monthIndex} months
          </p>
          <div className="iconArea">
            <GiChart className="icon" />
          </div>
          <div className="valueArea">
            <span>Value</span>
            <span className="values">₹{ele.customerValue}</span>
          </div>
          <div className="valueArea">
            <span>
              <span>Value after</span>
              <span className="month">{ele.monthIndex}</span> months
            </span>
            <span className="values">₹{ele.customerLossValue}</span>
          </div>
        </Col>
      </Col>
    ));
  render() {
    const { PredictionResponse } = this.state;
    const data = [
      {
        name: "Debit card",
        count: 10,
        value: 100
      },
      {
        name: "Debit card",
        count: 10,
        value: 100
      },
      {
        name: "Debit card",
        count: 10,
        value: 100
      },
      {
        name: "Debit card",
        count: 10,
        value: 100
      },
      {
        name: "Debit card",
        count: 10,
        value: 100
      }
    ];
    return (
      <Row
        type="flex"
        align="middle"
        style={{ position: "relative", height: "100%" }}
      >
        {/* {!PredictionResponse && <Loader />} */}
        <Col xl={24} className="churn">
          {PredictionResponse && this.renderCards(PredictionResponse)}
        </Col>
      </Row>
    );
  }
}
