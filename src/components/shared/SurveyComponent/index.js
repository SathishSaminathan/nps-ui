import React, { Component } from "react";
import "./survey.scss";
import { Row, Col } from "antd";

const SurveyValue = ({ value }) => {
  return <Col className="surveyValue">{value}</Col>;
};

const SurveyComponent = ({ fromName, companyName }) => {
  const renderInput = () => {
    let template = [];
    for (let i = 1; i <= 10; i++) {
      template.push(<SurveyValue value={i} key={i} />);
    }
    return template;
  };
  return (
    <Row className="surveyTemplateContainer">
      <Row className="header">
        <Col className="dotArea">
          <Col className="dot" />
          <Col className="dot" />
          <Col className="dot" />
        </Col>
      </Row>
      <Row className="fromToArea">
        <Row>
          <Col xl={24}>
            <Col xl={2} className="label">
              From:
            </Col>
            <Col className="value">
              {fromName}
              <span className="suffix">ab@nps.ly</span>
            </Col>
          </Col>
          <Col xl={24}>
            <Col xl={2} className="label">
              To:
            </Col>
            <Col className="value">
              <span className="suffix">jose.harris@nps.ly</span>
            </Col>
          </Col>
        </Row>
      </Row>
      <Row className="subjectArea">
        <Row>
          <Col xl={24}>
            <Col xl={3} className="label">
              Subject:
            </Col>
            <Col className="value">
              How likely are you to recommended {companyName} to a colleague?
            </Col>
          </Col>
        </Row>
      </Row>
      <Row className="bodyArea">
        <Col xl={24}>
          <Col xl={24}>
            <img
              className="mailLogo"
              src={
                "https://www.carlogos.org/logo/Lamborghini-bull-logo-1920x1080.png"
              }
            />
          </Col>
          <Col xl={24}>
            <Row type="flex" justify="center" className="contentContainer">
              <Col xl={24} className="text">
                <p style={{ textAlign: "center" }}>
                  How likely are you to recommended
                  <span className="companyName">{companyName}</span> to a
                  colleague?
                </p>
              </Col>
              <Col xl={20} className="surveyValueContainer">
                <Row type="flex" justify="center">
                  {renderInput()}
                </Row>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Row>
  );
};
export default SurveyComponent;
