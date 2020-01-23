import React, { Fragment, Component } from "react";
import SurveyComponent from "components/shared/SurveyComponent";

import "./survey.scss";
import "../../screens/Auth/Login/login.scss";
import { Row, Col, Button, Modal, Upload, message, Icon } from "antd";
import CustomInput from "components/shared/CustomInput";
import { showActionMessage } from "components/shared/NotificationComponent";
import { Notifications } from "constants/APIConstants";
import { Images } from "assets/images";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class Survey extends Component {
  state = {
    fromName: null,
    companyName: null,
    visible: false
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState(
      {
        visible: false
      },
      () => showActionMessage(Notifications.SUCCESS, "Survey sent")
    );
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { fromName, companyName, visible } = this.state;
    return (
      <Fragment>
        <Modal
          title="Upload contacts"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="createModal"
          okText="Send Survey"
        >
          <Upload {...props}>
            {/* <Button>
              <Icon type="upload" /> Click to Upload
            </Button> */}
            <img className="uploadImage" src={Images.GoogleSheet} />
          </Upload>
        </Modal>
        <Row style={{ padding: 24 }}>
          <Row>
            <Col xl={24}>
              <div className="surveyDescContainer">
                <span className="title">Survey</span>
                <p className="desc">
                  Customize your survey with your logo, images and colors so
                  that it matches your brand's Iidentity
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
                  <Button
                    style={{ float: "right", marginTop: 10 }}
                    type="primary"
                    className="customButton"
                    size="large"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </Fragment>
    );
  }
}

export default Survey;
