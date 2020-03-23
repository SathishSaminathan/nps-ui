import React, { Component } from "react";
import { Row, Col } from "antd";
import { FaPercent } from "react-icons/fa";
import { MdCloud, MdTimeline, MdShowChart } from "react-icons/md";
import { GiSwapBag, GiChart } from "react-icons/gi";

export default class ChurnPrediction extends Component {
  render() {
    const { history } = this.props;
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
      <Row type="flex" align="middle">
        <Col xl={24} className="churn">
          <Col
            className="churnCardContainer"
            onClick={() => history.push("/predictionmore")}
          >
            <Col className="churnCard">
              <p className="custCountArea">
                <span className="custCount"># 1000 </span> customers will leave
                likely leave us in 3 months
              </p>
              <div className="iconArea">
                <GiChart className="icon" />
              </div>
              <div className="valueArea">
                <span>Value</span>
                <span className="values">100000</span>
              </div>
              <div className="valueArea">
                <span>
                  <span>Value after</span>
                  <span className="month">3</span> months
                </span>
                <span className="values">200000</span>
              </div>
            </Col>
          </Col>
          <Col className="churnCardContainer">
            <Col className="churnCard">
              <p className="custCountArea">
                <span className="custCount"># 1000 </span> customers will leave
                likely leave us in 6 months
              </p>
              <div className="iconArea">
                <GiChart className="icon" />
              </div>
              <div className="valueArea">
                <span>Value</span>
                <span className="values">100000</span>
              </div>
              <div className="valueArea">
                <span>
                  <span>Value after</span>
                  <span className="month">6</span> months
                </span>
                <span className="values">200000</span>
              </div>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}
