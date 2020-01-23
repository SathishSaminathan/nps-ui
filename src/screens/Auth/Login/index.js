import React, { Component } from "react";

import "./login.scss";
import { AuthSVG } from "assets/undraw";
import { Images } from "assets/images";
import { Row, Col, Button } from "antd";
import CustomInput from "components/shared/CustomInput";
import CustomButton from "components/shared/CustomButton";

export default class Login extends Component {
  state = {
    isLogin: true
  };
  render() {
    const { isLogin } = this.state;
    console.log("this.props", this.props);
    return (
      <div className="mainContainer">
        <div className="loginContainer">
          <div className="inputContainer">
            <div className={`projectDescription ${isLogin ? "left" : "right"}`}>
              <img className="descImage" src={Images.SetupAnalytics}></img>
            </div>
            <div className="leftInputContainer">
              <div className="signUpContainer">
                <div className="titleArea">
                  <div className="titleText">Round's Edge Technologies</div>
                  <div className="titleText">Sign Up for NPS</div>
                  {/* <p className="titleDesc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy.
                  </p> */}
                </div>
                <div className="inputArea">
                  <Row type="flex" justify="center">
                    <Col xl={24}>
                      <Row>
                        <Col xl={24}>
                          <CustomInput label="Name" important />
                        </Col>
                      </Row>
                    </Col>
                    <Row>
                      <Col xl={24} style={{ paddingTop: 30 }}>
                        <Col xl={12}>
                          <CustomInput label="Email" type="email" important />
                        </Col>
                        <Col xl={12}>
                          <div style={{ marginLeft: 15 }}>
                            <CustomInput label="Mobile Number" type="number" />
                          </div>
                        </Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={24} style={{ paddingTop: 30 }}>
                        <Col xl={12}>
                          <CustomInput label="Password" type="password" />
                        </Col>
                        <Col xl={12}>
                          <div style={{ marginLeft: 15 }}>
                            <CustomInput
                              label="Re-Type Password"
                              type="password"
                            />
                          </div>
                        </Col>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                      <CustomButton>Register</CustomButton>
                    </Row>
                    <Col xl={24}>
                      <Row
                        style={{ marginTop: 10 }}
                        type="flex"
                        justify="center"
                      >
                        <Col>
                          <div className="already">
                            Already have an account ?
                            <span
                              onClick={() => {
                                this.setState({ isLogin: !this.state.isLogin });
                              }}
                            >
                              Log in
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="rightInputContainer">
              <div className="signUpContainer">
                <div className="titleArea">
                  <div className="titleText">Round's Edge Technologies</div>
                  <div className="titleText">Login for NPS</div>
                  {/* <p className="titleDesc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy.
                  </p> */}
                </div>
                <div className="inputArea">
                  <Row type="flex" justify="center">
                    <Col xl={18}>
                      <Row>
                        <Col xl={24}>
                          <CustomInput label="Email" type="email" important />
                        </Col>
                        <Col xl={24} style={{ marginTop: 20 }}>
                          <CustomInput label="Password" type="password" />
                        </Col>
                        <Col xl={24} style={{ marginTop: 20 }}>
                          <Row type="flex" justify="end">
                            <Col className="link">Forgot Password ?</Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Row style={{ marginTop: 30 }}>
                      <CustomButton
                        onClick={() => {
                          this.props.history.push("/dashboardWithoutData");
                          localStorage.setItem("user", true);
                        }}
                      >
                        Login
                      </CustomButton>
                    </Row>
                    <Col xl={24}>
                      <Row
                        style={{ marginTop: 10 }}
                        type="flex"
                        justify="center"
                      >
                        <Col>
                          <div className="already">
                            New User ?
                            <span
                              onClick={() =>
                                this.setState({ isLogin: !this.state.isLogin })
                              }
                            >
                              Create Account
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
