import React from "react";
import { Row, Col } from "antd";

const CustomInput = ({
  label,
  type,
  maxLength,
  important = false,
  bordered = false,
  style,
  handleChange,
  name
}) => {
  return (
    <Row className="input" style={style}>
      <Col xl={24}>
        <span className={`label ${important ? "important" : ""}`}>
          {label}
          {important ? "*" : ""}
        </span>
      </Col>
      <Col xl={24}>
        <input
          className={`${bordered ? "bordered" : ""}`}
          type={type}
          name={name}
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
};

export default CustomInput;
