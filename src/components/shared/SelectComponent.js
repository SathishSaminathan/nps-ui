import React, { useState } from "react";
import { Select, Row, Col, Radio } from "antd";

const { Option } = Select;

export const SelectComponent = ({
  handleProductChange,
  data,
  label = null,
  field,
  defaultValue = null,
  value
}) => {
  console.log("data", data);
  return (
    <Row>
      {label && (
        <Col>
          <span className="label">{label}</span>
        </Col>
      )}
      <Col>
        <Select
          allowClear
          showSearch
          value={value}
          defaultValue={defaultValue}
          style={{ width: "100%" }}
          placeholder="All"
          optionFilterProp="children"
          onChange={value => handleProductChange(value, field)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {data.map((datum, i) => (
            <Option value={datum.value} key={i}>
              {datum.label}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};
