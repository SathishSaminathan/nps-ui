import React, { Component } from "react";
import { Row, Col } from "antd";

import BarChart from "components/shared/Charts/BarChart";

import "./textAnalytics.scss";

export default class TextAnalytics extends Component {
  render() {
    return (
      <Row>
        <Col xl={8} className="overallPattern">
          <Col style={{ height: 600 }}>
            <BarChart title="Overall Pattern" />
          </Col>
        </Col>
        <Col xl={8} className="subPattern">
          <Col style={{ height: 600 }}>
            <BarChart title="Sub Patterns" />
          </Col>
        </Col>
        <Col xl={8} className="commentSection">
          <Col style={{ height: 600 }}>
            <h2>Comment Sections</h2>
            <Row className="comment">
              <Col xl={24}>
                <Col xl={6} className="imageDetailArea">
                  <Row>
                    <Col xl={24} className="imageArea">
                      <img
                        className="image"
                        src="https://randomuser.me/api/portraits/men/73.jpg"
                      />
                    </Col>
                    <Col xl={24} className="detailArea">
                      <Col className="name">SathishSaminathan</Col>
                      <Col className="mail">Sathis@gmail.com</Col>
                      {/* <Col className="work">Design @ NPS</Col> */}
                    </Col>
                  </Row>
                </Col>
                <Col xl={18} className="commentText">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </Col>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    );
  }
}
