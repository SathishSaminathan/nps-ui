import React from "react";
import { Select, Row, Col } from "antd";

const { Option } = Select;

export default function Filters({ products }) {
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Row type="flex" align="middle" justify="center">
      <Row>
        <Col>
          <span className="label">Products</span>
        </Col>
        <Col>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="(All)"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {products &&
              products.map((product, i) => (
                <Option value={product} key={i}>
                  {product}
                </Option>
              ))}
          </Select>
        </Col>
      </Row>
    </Row>
  );
}
