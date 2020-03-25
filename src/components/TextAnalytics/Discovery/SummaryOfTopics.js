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
        title: "",
        dataIndex: "name",
        key: "name",
        width: "18%"
      },
      {
        title: "Impact",
        dataIndex: "age",
        key: "age",
        width: "8%"
      },
      {
        title: "NPS",
        dataIndex: "address",
        key: "address",
        width: "8%"
      },
      {
        title: "# of Responses",
        dataIndex: "age",
        key: "age",
        width: "13%"
      },
      {
        title: "% of Responses",
        dataIndex: "address",
        key: "address",
        width: "13%"
      },
      {
        title: "What % of the Topic of Positive?",
        dataIndex: "age",
        key: "age",
        width: "20%"
      },
      {
        title: "What % of the Topic of Negative?",
        dataIndex: "address",
        key: "address",
        width: "20%"
      }
    ];

    return (
      <Fragment>
        <Col xl={24}>
          <DescTitle
            style={{ fontSize: 15, paddingTop: 10, paddingBottom: 15 }}
          >
            Summary of Products
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
