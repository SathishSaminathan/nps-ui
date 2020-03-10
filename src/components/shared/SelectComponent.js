import React, { useState } from "react";
import { Select, Row, Col, Radio } from "antd";

const { Option } = Select;

export const SelectComponent = ({
  handleProductChange,
  data,
  label = null
}) => (
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
        style={{ width: "100%" }}
        placeholder="All"
        optionFilterProp="children"
        onChange={value => handleProductChange(value, label)}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {data.map((product, i) => (
          <Option value={product} key={i}>
            {product}
          </Option>
        ))}
      </Select>
    </Col>
  </Row>
);
