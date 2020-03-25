import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import { Col, Table, Icon, Popover, Radio, Input, Button } from "antd";

export default class SummaryOfTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisionMonth: "QUATERLY"
    };
  }

  handleComparisionMonth = ({ target: { value } }) => {
    this.setState({ comparisionMonth: value });
  };

  render() {
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "32.56%"
      }
    ];

    const columns = [
      {
        title: "Themes",
        dataIndex: "name",
        key: "name",
        width: "70%"
      },
      {
        title: "NPS",
        dataIndex: "address",
        key: "address",
        width: "15%"
      },
      {
        title: "Impact",
        dataIndex: "age",
        key: "age",
        width: "15%"
      }
    ];

    const { isBetter } = this.props;
    const { comparisionMonth } = this.props;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    return (
      <Fragment>
        <Col xl={24}>
          <Col
            className="descTitleArea"
            style={{ paddingTop: 10, paddingBottom: 15 }}
          >
            <DescTitle style={{ fontSize: 15 }}>
              Which Themes are getting {isBetter ? "Better" : "Worse"}?
            </DescTitle>
            <Popover
              content={
                <div>
                  <Radio.Group
                    // value={size}
                    onChange={this.handleComparisionMonth}
                    defaultValue={comparisionMonth}
                  >
                    <Radio style={radioStyle} value="QUATERLY">
                      Quaterly
                    </Radio>
                    <Radio style={radioStyle} value="HALF_YEARLY">
                      Half Yearly
                    </Radio>
                    <Radio style={radioStyle} value="YEARLY">
                      Yearly
                    </Radio>
                  </Radio.Group>
                </div>
              }
              trigger="click"
              placement="right"
            >
              <Button icon="more"></Button>
            </Popover>
          </Col>
        </Col>
        <Col xl={24}>
          <Table
            className="summaryOfTopics"
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
          />
        </Col>
      </Fragment>
    );
  }
}
