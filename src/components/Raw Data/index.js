import React, { Component } from "react";
import { Table, Row, Col, Tag } from "antd";
import LinesEllipsis from "react-lines-ellipsis";

import myData from "data.json";

const columns = [
  {
    title: "Customer ID",
    width: 150,
    dataIndex: "Customer ID",
    key: "Customer ID",
    fixed: "left"
  },
  {
    title: "Complaint Id",
    width: 110,
    dataIndex: "Complaint-id",
    key: "Complaint-id",
    fixed: "left"
  },
  {
    title: "NPS Score",
    width: 150,
    dataIndex: "NPS-Score",
    key: "NPS-Score",
    fixed: "left",
    align: "center"
  },
  {
    title: "Date Received",
    dataIndex: "Date-Received",
    key: "Date-Received",
    width: 100
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender",
    width: 100
  },
  {
    title: "Age",
    dataIndex: "Age",
    key: "Age",
    width: 100
  },
  {
    title: "State",
    dataIndex: "State",
    key: "State",
    width: 80
  },
  {
    title: "Zip-Code",
    dataIndex: "Zip-Code",
    key: "Zip-Code",
    width: 100
  },
  {
    title: "Timely Response",
    dataIndex: "Timely-Response?",
    key: "Timely-Response?",
    width: 100,
    align: "center",
    render: text => <Tag className={`${text} tag`}>{text}</Tag>
  },
  {
    title: "Disputed",
    dataIndex: "Disputed?",
    key: "Disputed?",
    width: 100,
    align: "center",
    render: text => <Tag className={`${text} tag`}>{text}</Tag>
  },
  {
    title: "Via",
    dataIndex: "Via",
    key: "Via",
    width: 100
  },
  {
    title: "Issue",
    dataIndex: "Issue",
    key: "Issue",
    width: 250
  },
  {
    title: "Consumer Message",
    dataIndex: "Consumer-Message",
    key: "Issue",
    width: 180,
    render: text => <div className="textEllipsis">{text}</div>
  },
  // {
  //   title: "Consumer Message",
  //   dataIndex: "Consumer-Message",
  //   key: "Consumer-Message",
  //   width: 150,
  //   render: text => (
  //     // <LinesEllipsis
  //     //   text={text}
  //     //   maxLine="3"
  //     //   ellipsis="..."
  //     //   // trimRight
  //     //   basedOn="letters"
  //     // />
  //     <div className="textEllipsis">{text}</div>
  //   )
  // },
  // { title: "Timely Response?", dataIndex: "Timely-Response?", key: "Timely-Response?", width: 150 },
  {
    title: "Product",
    dataIndex: "Product",
    key: "Product",
    fixed: "right",
    width: 100,
    render: text => text && <a>{text}</a>
  }
];

export default class RawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: myData.Sheet1
    };
  }

  componentDidMount() {
    // console.log("hai", myData.Sheet1[0]);
  }
  render() {
    const { data } = this.state;
    return (
      <Row style={{ padding: 24 }}>
        <Col>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500, y: "66vh" }}
            pagination={{ pageSize: 100 }}
          />
        </Col>
      </Row>
    );
  }
}
