import React, { Component } from "react";
import { Col, Row, Tabs } from "antd";

import KPI from "./KPI";
import ThemesAndSentiments from "./ThemesAndSentiments";

const { TabPane } = Tabs;

export default class SatelliteMain extends Component {
  render() {
    return (
      <Row
        style={{ backgroundColor: "#f4f5f7", height: "79.3vh" }}
        className="satelliteMain"
      >
        {/* <HeaderComponent
          //   {...this.props}
          title="Satellite"
          //   hasBack
        /> */}
        <Col xl={24}>
          <Tabs defaultActiveKey="1">
            <TabPane
              style={{ backgroundColor: "#f4f5f7" }}
              tab={<span>Customer Experiance</span>}
              key="1"
            >
              <Tabs defaultActiveKey="1">
                <TabPane
                  style={{ backgroundColor: "#f4f5f7" }}
                  tab={<span>KPI</span>}
                  key="1"
                >
                  <KPI />
                </TabPane>
                <TabPane tab={<span>Themes and sentiments</span>} key="2">
                  <ThemesAndSentiments />
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab={<span>Employee Performance</span>} key="2">
            <Tabs defaultActiveKey="1">
                <TabPane
                  style={{ backgroundColor: "#f4f5f7" }}
                  tab={<span>KPI</span>}
                  key="1"
                >
                  <KPI />
                </TabPane>
                <TabPane tab={<span>Themes and sentiments</span>} key="2">
                  <ThemesAndSentiments />
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}
