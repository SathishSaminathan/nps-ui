import React, { Component } from "react";
import { Row, Col } from "antd";
import { FaPercent } from "react-icons/fa";
import { MdCloud } from "react-icons/md";
import { GiSwapBag } from "react-icons/gi";

export default class ChurnPrediction extends Component {
  render() {
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
          {data.map((ele, i) => (
            <Col className="churnCardContainer">
              <Col className="churnCard">
                <Col className="name">{ele.name}</Col>
                <Col className="countValueArea">
                  <Col className="countArea">
                    <GiSwapBag />
                    <Col>{ele.count}</Col>
                  </Col>
                  <Col className="divider"></Col>
                  <Col className="valueArea">
                    <MdCloud />
                    <Col>{ele.count}</Col>
                  </Col>
                </Col>
              </Col>
            </Col>
          ))}
        </Col>
      </Row>
    );
  }
}
