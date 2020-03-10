import React, { useState } from "react";
import { Select, Row, Col, Radio, Button } from "antd";

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
  const [via, setVia] = useState(null);
  const [gender, setGender] = useState("Both");
  const [state, setState] = useState(null);
  const [age, setAge] = useState(null);
  const [Product, setProduct] = useState(null);

  const handleChange = (value, type) => {
    console.log(value);
    console.log(type);
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

  const filter = (value) => {

    let filterData = {
      via,
      age,
      gender,
      state
    }
    console.log({ filterData });
    // this._service.service(filterData).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }


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
            handleProductChange={(value, type) => setVia(value)}
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
                onChange={e => setGender(e.target.value)}
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
            handleProductChange={(value, type) => setState(value)}
          />
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <Col>
            <span className="label">Age</span>
          </Col>
          <Radio.Group
            onChange={e => setAge(e.target.value)}
            defaultValue="a"
          >
            <Radio.Button value="18:25">18-25</Radio.Button>
            <Radio.Button value="26:35">26-35</Radio.Button>
            <Radio.Button value="36:50">36-50</Radio.Button>
          </Radio.Group>
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <Button
            style={{ textAlign: 'center', marginTop: 10 }}
            type="primary"
            className="customButton"
            size="large"
            onClick={(value) => filter(value)}
          >
            Filter
                    </Button>
        </Col>
      </Col>
    </Row>
  );
}
