import React from "react";
import { Row, Col } from "antd";
import { numberOnly } from "helpers/validationHelpers";

const CustomInput = ({
  label,
  type = "text",
  maxLength,
  important = false,
  bordered = false,
  style,
  handleChange,
  name,
  inputStyle,
  labelStyle,
  onlyNumber,
  handleEnter
}) => {
  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      handleEnter && handleEnter();
    }
  };

  return (
    <Row className="input" style={style}>
      <Col xl={24}>
        <span
          className={`label ${important ? "important" : ""}`}
          style={labelStyle}
        >
          {label}
          {important ? "*" : ""}
        </span>
      </Col>
      <Col xl={24}>
        <input
          className={`${bordered ? "bordered" : ""}`}
          style={inputStyle}
          type={type}
          name={name}
          maxLength={maxLength}
          onKeyDown={_handleKeyDown}
          onChange={e =>
            onlyNumber ? handleChange(numberOnly(e)) : handleChange(e)
          }
        />
      </Col>
    </Row>
  );
};

export default CustomInput;
