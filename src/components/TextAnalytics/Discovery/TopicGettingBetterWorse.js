import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import { Col, Table } from "antd";

export default class SummaryOfTopics extends Component {
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

    return (
      <Fragment>
        <Col xl={24}>
          <DescTitle
            style={{ fontSize: 15, paddingTop: 10, paddingBottom: 15 }}
          >
            Which Themes are getting {isBetter ? "Better" : "Worse"}?
          </DescTitle>
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
