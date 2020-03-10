import React, { Component } from "react";
import { Row, Col, DatePicker, Button, Slider } from "antd";

import "./dashboard1.scss";
import Label from "../Label";
import { SelectComponent } from "../SelectComponent";

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

export default class DashboardComponent1 extends Component {
  render() {
    return (
      <Row>
        <Col xl={24}>
          <Col className="topContainer">
            <Row className="headerArea" style={{ marginBottom: 0 }}>
              <Col className="header">Neptune & Strategie Assignment tool</Col>
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
      </Row>
    );
  }
}
