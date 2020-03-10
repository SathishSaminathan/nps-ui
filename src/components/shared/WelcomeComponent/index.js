import React, { Fragment } from "react";
import { Row, Col } from "antd";

import "./welcome.scss";
import { Images } from "assets/images";
import CustomButton from "../CustomButton";

const WelcomeComponent = ({ history }) => {
  return (
    <Row style={{ padding: 24 }}>
      <Row>
        <Col xl={18}>
          <div className="welcomeCard">
            <p className="welcome">
              <div className="label">Welcome Back, Sathish!</div>
              <span className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy{" "}
              </span>
            </p>
            <img src={Images.WelcomePerson} className="image" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={8}>
          <div className="surveyContainer">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
            <div>
              <CustomButton onClick={() => history.push("/survey")}>
                Take Survey
              </CustomButton>
            </div>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default WelcomeComponent;
