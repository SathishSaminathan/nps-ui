import React from "react";
import { Row, Col } from "antd";

const CustomInput = ({ label, type, maxLength, important = false }) => {
  return (
    <Row className="input">
      <Col xl={24}>
        <span className={`label ${important ? "important" : ""}`}>
          {label}
          {important ? "*" : ""}
        </span>
      </Col>
      <Col xl={24}>
        <input type={type} />
      </Col>
    </Row>
  );
};

export default CustomInput;
