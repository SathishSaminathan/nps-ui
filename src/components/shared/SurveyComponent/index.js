import React, { Component } from "react";
import "./survey.scss";
import { Row, Col } from "antd";

const SurveyComponent = ({ fromName, companyName }) => {
  return (
    <div className="surveyTemplateContainer">
      <div className="header">
        <div className="dotArea">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
      <div className="fromToArea">
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
              Harris<span className="suffix">jose.harris@nps.ly</span>
            </Col>
          </Col>
        </Row>
      </div>
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
          <Col xl={24} className="contentContainer">
            <Col className="text">
              <p>
                How likely are you to recommended
                <span className="companyName">{companyName}</span> to a
                colleague?
              </p>
            </Col>
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default SurveyComponent;
