import React from "react";
import { Row, Col, Icon } from "antd";

const HeaderComponent = ({ title = "", hasBack, children, history }) => {
  return (
    <Row className="commonHeaderArea">
      <Col className="iconTitleArea">
        {hasBack && (
          <Col
            className="icon"
            style={{ padding: 10, paddingTop: 0, paddingBottom: 0 }}
            onClick={() => history.goBack()}
          >
            <Icon type="left" />
          </Col>
        )}
        <Col className="header">{title}</Col>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
