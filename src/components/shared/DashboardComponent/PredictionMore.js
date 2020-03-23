import React, { Component } from "react";
import { Row, Col, Tabs } from "antd";

import HeaderComponent from "../HeaderComponent";
import PredictionMoreTabContentComponent from "./PredictionMoreTabContentComponent";

const { TabPane } = Tabs;

const PredictionMore = props => {
  const renderTabs = () => {
    return ["Banking", "Debit card"].map((ele, index) => (
      <TabPane tab={ele} key={index + 1}>
        <PredictionMoreTabContentComponent {...props} title={ele} />
      </TabPane>
    ));
  };

  console.log(renderTabs());

  return (
    <Row>
      <HeaderComponent {...props} title="Prediction by Products" hasBack />
      <Col xl={24}>
        <Tabs defaultActiveKey="1">{renderTabs()}</Tabs>
      </Col>
    </Row>
  );
};

export default PredictionMore;
