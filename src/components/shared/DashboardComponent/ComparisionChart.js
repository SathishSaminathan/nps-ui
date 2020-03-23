import React, { Component } from "react";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { Row, Col, Select } from "antd";
import ProductChartCamparision from "./ProductChartCamparision";
import ProductThemesComparision from "./ProductThemesComparision";

export default class ComparisionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VOCResponse: []
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = () => {
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

  render() {
    return (
      <Row>
        <Col xl={24} style={{ padding: 10, paddingTop: 0 }}>
          <Col>
            <ProductChartCamparision />
          </Col>
          <Col style={{ paddingTop: 10 }}>
            <ProductThemesComparision />
          </Col>
        </Col>
      </Row>
    );
  }
}
