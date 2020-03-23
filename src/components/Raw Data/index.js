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
  Tooltip,
  Pagination
} from "antd";
import LinesEllipsis from "react-lines-ellipsis";

import myData from "data.json";
import LottieComponent from "components/shared/LottieComponent";
import { Lotties } from "constants/AppConstants";
import RecordNotFound from "components/shared/RecordNotFound";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import Loader from "components/shared/Loader";

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
    dataIndex: "customerId",
    key: "customerId",
    fixed: "left",
    align: "center"
  },
  {
    title: "NPS Score",
    width: 80,
    dataIndex: "npsScore",
    key: "npsScore",
    fixed: "left",
    align: "center"
  },
  {
    title: "Complaint Id",
    width: 110,
    dataIndex: "complaintId",
    key: "complaintId",
    // fixed: "left",
    align: "center"
  },
  {
    title: "Date Received",
    dataIndex: "receivedDate",
    key: "receivedDate",
    width: 100
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 100,
    render: text => <Tag className={`${text} tag`}>{text}</Tag>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 100
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    width: 80
  },
  {
    title: "Zip-Code",
    dataIndex: "zipCode",
    key: "zipCode",
    width: 100
  },
  {
    title: "Timely Response",
    dataIndex: "timelyResponse",
    key: "timelyResponse",
    width: 100,
    align: "center",
    render: text => <Tag className={`${text} tag`}>{text}</Tag>
  },
  {
    title: "Disputed",
    dataIndex: "disputed",
    key: "disputed",
    width: 100,
    align: "center",
    render: text => (
      <Tag className={`${text === "N/A" ? "NA" : text} tag`}>{text}</Tag>
    )
  },
  {
    title: "Via",
    dataIndex: "via",
    key: "via",
    width: 100
  },
  {
    title: "Consumer Message",
    dataIndex: "message",
    key: "message",
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
    dataIndex: "product",
    key: "product",
    width: 150,
    align: "center",
    render: text =>
      text && (
        <Tooltip
          placement="left"
          title={text}
          className="productName"
          style={{ width: 100 }}
        >
          <a className="link productEllipsis">{text}</a>
        </Tooltip>
      )
  },
  {
    title: "Issue",
    dataIndex: "issue",
    key: "issue",
    fixed: "right",
    width: 200
  },
  {
    title: "Sub Issue",
    dataIndex: "subIssue",
    key: "subIssue",
    fixed: "right",
    width: 200
  }
];

const columns1 = [
  {
    title: "Customer ID",
    width: 150,
    dataIndex: "Customer ID",
    key: "Customer ID",
    fixed: "left",
    align: "center"
  },
  {
    title: "NPS Score",
    width: 110,
    dataIndex: "NPS-Score",
    key: "NPS-Score",
    fixed: "left",
    align: "center"
  },
  {
    title: "Complaint Id",
    width: 110,
    dataIndex: "Complaint-id",
    key: "Complaint-id",
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
    title: "Issue",
    dataIndex: "Issue",
    fixed: "right",
    key: "Issue",
    width: 250
  },
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
      data: [],
      PaginationValue: 1,
      IsDataFetched: false,
      TotalData: 100
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    const { PaginationValue } = this.state;
    this.fetchData(PaginationValue);
  }

  fetchData = PaginationValue => {
    this.setState({
      IsDataFetched: false
    });
    this.dashboardAPI
      .service(DashboardVariables.GET_RAW_DATA, PaginationValue - 1)
      .then(res => {
        this.setState({
          data: res.data.results,
          TotalData: res.data.totalData,
          IsDataFetched: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePagination = value => {
    this.fetchData(value);
  };
  render() {
    const { data, PaginationValue, IsDataFetched, TotalData } = this.state;
    return (
      <Row>
        {!IsDataFetched && <Loader />}
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
        <Row style={{ padding: 24, paddingTop: 0 }}>
          <Col xl={24} style={{ marginBottom: 10 }}>
            <Pagination
              style={{ float: "right" }}
              defaultCurrent={PaginationValue}
              onChange={this.handlePagination}
              total={TotalData}
            />
          </Col>
          <Col xl={24}>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 1500, y: "66vh" }}
              // pagination={{ pageSize: 10 }}
              pagination={false}
              // loading={data.length === 0}
              locale={{
                emptyText: <RecordNotFound />
              }}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}
