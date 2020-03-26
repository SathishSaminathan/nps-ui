import React, { useState } from "react";
import { Select, Row, Col, Radio } from "antd";

const { Option } = Select;

export const SelectComponent = ({
  handleProductChange,
  data,
  label = null,
  field,
  defaultValue = null,
  value = undefined,
  placeholder,
  allowClear = true,
  loading = false
}) => {
  return (
    <Row>
      {label && (
        <Col>
          <span className="label">{label}</span>
        </Col>
      )}
      <Col>
        <Select
          allowClear={allowClear}
          loading={loading}
          showSearch
          value={value}
          defaultValue={defaultValue}
          style={{ width: "100%" }}
          placeholder={placeholder ? placeholder : "All"}
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
