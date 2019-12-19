import React, { Component } from "react";
import { Row, Col } from "antd";
import BarChart from "components/shared/Charts/BarChart";

export default class TextAnalytics extends Component {
  render() {
    return (
      <Row>
        <Col xl={12} style={{ height: 600 }}>
          <BarChart />
        </Col>
      </Row>
    );
  }
}
