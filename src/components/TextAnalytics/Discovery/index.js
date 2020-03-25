import React, { Component, Fragment } from "react";
import { Row, Col } from "antd";

import DescTitle from "components/shared/DescTitle";
import DistributionByTopic from "./DistributionByTopic";
import SummaryOfTopics from "./SummaryOfTopics";
import TopicGettingBetterWorse from "./TopicGettingBetterWorse";
import ProductSentiment from "./ProductSentiment";
import ProductVolume from "./ProductVolume";

export default class Discovery extends Component {
  render() {
    const style = {
      marginTop: 20
    };
    return (
      <Row style={{ padding: 24 }}>
        <Fragment>
          <Col xl={24}>
            <DescTitle>How are we doing overall?</DescTitle>
          </Col>
          <Col xl={24} className="desByTopic" style={{ ...style }}>
            <DistributionByTopic />
          </Col>
          <Col xl={24} className="desByTopic" style={{ ...style }}>
            <SummaryOfTopics />
          </Col>
        </Fragment>
        <Fragment>
          <Col xl={24} style={{ ...style }}>
            <DescTitle>How is the conversation changing?</DescTitle>
          </Col>
          <Col xl={12} style={{ ...style, paddingRight: 10 }}>
            <Col xl={24} className="desByTopic">
              <TopicGettingBetterWorse isBetter />
            </Col>
          </Col>
          <Col xl={12} style={{ ...style, paddingLeft: 10 }}>
            <Col xl={24} className="desByTopic">
              <TopicGettingBetterWorse />
            </Col>
          </Col>
        </Fragment>
        <Fragment>
          <Col xl={24} style={{ ...style, paddingRight: 10 }}>
            <Col xl={24} className="desByTopic">
              <ProductSentiment />
            </Col>
          </Col>
        </Fragment>
        <Fragment>
          <Col xl={24} style={{ ...style, paddingRight: 10 }}>
            <Col xl={24} className="desByTopic">
              <ProductVolume />
            </Col>
          </Col>
        </Fragment>
      </Row>
    );
  }
}
