import React, { Fragment, Component } from "react";
import SurveyComponent from "components/shared/SurveyComponent";

import "./survey.scss";
import "../../screens/Auth/Login/login.scss";
import { Row, Col } from "antd";
import CustomInput from "components/shared/CustomInput";

class Survey extends Component {
  state = {
    fromName: null,
    companyName: null
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const { fromName, companyName } = this.state;
    return (
      <Row style={{ padding: 24 }}>
        <Row>
          <Col xl={18}>
            <div className="surveyDescContainer">
              <span className="title">1.Survey</span>
              <p className="desc">
                Customize your survey with your logo, images and colors so that
                it matches your brand's Iidentity
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Col xl={24} className="customizeSurveyContainer">
            <span className="title">Custom Survey</span>
            <Row className="surveyContainer">
              <Col xl={6}>
                <CustomInput
                  label="Brand or company name"
                  type="email"
                  bordered
                  name="companyName"
                  handleChange={this.handleChange}
                />
                <CustomInput
                  label="From name"
                  bordered
                  style={{ marginTop: 15 }}
                  name="fromName"
                  handleChange={this.handleChange}
                />
              </Col>
              <Col xl={18} style={{ paddingLeft: 15 }}>
                <SurveyComponent
                  fromName={fromName}
                  companyName={companyName}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Survey;
