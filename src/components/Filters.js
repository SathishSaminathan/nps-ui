import React, { useState } from "react";
import { Select, Row, Col, Radio } from "antd";

const { Option } = Select;

const SelectComponent = ({ handleProductChange, data, label }) => (
  <Row>
    <Col>
      <span className="label">{label}</span>
    </Col>
    <Col>
      <Select
        allowClear
        showSearch
        style={{ width: 200 }}
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

export default function Filters({ products, handleFilter, states }) {
  const [Filters, setFilters] = useState({});
  const [Product, setProduct] = useState(null);

  const handleChange = (value, type) => {
    // setProduct(value ? value : null);
    // let filters = Filters;
    // filters = [
    //   {
    //     label: type,
    //     value
    //   }
    // ];
    // console.log(filters);
    handleFilter(value, type);
  };

  return (
    <Row type="flex" align="middle" justify="center" style={{ paddingTop: 20 }}>
      <Col xl={20}>
        {/* <Col style={{ marginBottom: 10 }}>
          <SelectComponent
            data={products}
            label="Product"
            handleProductChange={handleChange}
          />
        </Col> */}
        <Col style={{ marginBottom: 10 }}>
          <SelectComponent
            data={["Web", "Mail", "Slack"]}
            label="Via"
            handleProductChange={handleChange}
          />
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <Row>
            <Col>
              <span className="label">Gender</span>
            </Col>
            <Col>
              <Radio.Group
                defaultValue="Both"
                onChange={e => handleChange(e.target.value, "Gender")}
              >
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
                <Radio value={"Both"}>Both</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <SelectComponent
            data={states}
            label="State"
            handleProductChange={handleChange}
          />
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <Col>
            <span className="label">Age</span>
          </Col>
          <Radio.Group
            onChange={e => handleChange(e.target.value, "Age")}
            defaultValue="a"
          >
            <Radio.Button value="18:25">18-25</Radio.Button>
            <Radio.Button value="26:35">26-35</Radio.Button>
            <Radio.Button value="36:50">36-50</Radio.Button>
          </Radio.Group>
        </Col>
      </Col>
    </Row>
  );
}
