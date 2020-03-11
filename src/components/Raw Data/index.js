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
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";

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
    render: text => (
      <Tag className={`${text} tag`}>{text}</Tag>
    )
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
    title: "Issue",
    dataIndex: "issue",
    key: "issue",
    fixed: "right",
    width: 250
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    fixed: "right",
    width: 150,
    align: "center",
    render: text =>
      text && (
        <Tooltip placement="left" title={text} className="productName" style={{ width: 100 }}>
          <a className="link productEllipsis">{text}</a>
        </Tooltip>
      )
  }
];

export default class RawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_RAW_DATA)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
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
              loading={data.length === 0}
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
