import React, { Component, Fragment } from "react";
import {
  Table,
  Row,
  Col,
  Tag,
  Upload,
  message,
  Button,
  Icon,
  Tooltip
} from "antd";
import LinesEllipsis from "react-lines-ellipsis";

import myData from "data.json";
import LottieComponent from "components/shared/LottieComponent";
import { Lotties } from "constants/AppConstants";
import RecordNotFound from "components/shared/RecordNotFound";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const columns = [
  {
    title: "Customer ID",
    width: 150,
    dataIndex: "Customer ID",
    key: "Customer ID",
    fixed: "left",
    align: "center"
  },
  {
    title: "Complaint Id",
    width: 110,
    dataIndex: "Complaint-id",
    key: "Complaint-id",
    fixed: "left",
    align: "center"
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
    render: text => (
      <Tooltip placement="left" title={text} style={{ width: 400 }}>
        <div className="textEllipsis">{text}</div>
      </Tooltip>
    )
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
    align: "center",
    render: text => text && <a className="link">{text}</a>
  }
];

export default class RawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: myData.Sheet1
      });
    }, 500);
  }
  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <Row
          className="bandArea"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Col className="header">Customer Complaints</Col>
          <Col>
            <Upload {...props}>
              <Button type="primary" className="customButton">
                <Icon type="upload" /> Upload Complaints
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row style={{ padding: 24 }}>
          <Col>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 1500, y: "66vh" }}
              pagination={{ pageSize: 10 }}
              // loading={data.length === 0}
              locale={{
                emptyText: <RecordNotFound />
              }}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
