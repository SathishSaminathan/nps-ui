import React, { Component } from "react";
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
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import RecordNotFound from "../RecordNotFound";

const columns = [
  {
    title: "Customer ID",
    width: 150,
    dataIndex: "customerId",
    key: "customerId",
    // fixed: "left",
    align: "center"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // fixed: "left",
    width: 100
  },
  // {
  //   title: "NPS Score",
  //   width: 80,
  //   dataIndex: "npsScore",
  //   key: "npsScore",
  //   fixed: "left",
  //   align: "center"
  // },
  // {
  //   title: "Complaint Id",
  //   width: 110,
  //   dataIndex: "complaintId",
  //   key: "complaintId",
  //   // fixed: "left",
  //   align: "center"
  // },
  // {
  //   title: "Date Received",
  //   dataIndex: "receivedDate",
  //   key: "receivedDate",
  //   width: 100
  // },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 80,
    render: text => <Tag className={`${text} tag`}>{text}</Tag>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 80
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    width: 80
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: 100
  },

  {
    title: "Zip-Code",
    dataIndex: "zipCode",
    key: "zipCode",
    width: 100
  },
  {
    title: "Money",
    dataIndex: "money",
    key: "money",
    width: 80
  },
  {
    title: "Loss Money",
    dataIndex: "lossMoney",
    key: "lossMoney",
    width: 80
  }
  // {
  //   title: "Timely Response",
  //   dataIndex: "timelyResponse",
  //   key: "timelyResponse",
  //   width: 100,
  //   align: "center",
  //   render: text => <Tag className={`${text} tag`}>{text}</Tag>
  // },
  // {
  //   title: "Disputed",
  //   dataIndex: "disputed",
  //   key: "disputed",
  //   width: 100,
  //   align: "center",
  //   render: text => (
  //     <Tag className={`${text === "N/A" ? "NA" : text} tag`}>{text}</Tag>
  //   )
  // },
  // {
  //   title: "Via",
  //   dataIndex: "via",
  //   key: "via",
  //   width: 100
  // },
  // {
  //   title: "Consumer Message",
  //   dataIndex: "message",
  //   key: "message",
  //   width: 180,
  //   render: text => (
  //     <Tooltip placement="left" title={text} style={{ width: 400 }}>
  //       <div className="textEllipsis">{text}</div>
  //     </Tooltip>
  //   )
  // },
  // // {
  // //   title: "Consumer Message",
  // //   dataIndex: "Consumer-Message",
  // //   key: "Consumer-Message",
  // //   width: 150,
  // //   render: text => (
  // //     // <LinesEllipsis
  // //     //   text={text}
  // //     //   maxLine="3"
  // //     //   ellipsis="..."
  // //     //   // trimRight
  // //     //   basedOn="letters"
  // //     // />
  // //     <div className="textEllipsis">{text}</div>
  // //   )
  // // },
  // // { title: "Timely Response?", dataIndex: "Timely-Response?", key: "Timely-Response?", width: 150 },
  // {
  //   title: "Product",
  //   dataIndex: "product",
  //   key: "product",
  //   width: 150,
  //   align: "center",
  //   render: text =>
  //     text && (
  //       <Tooltip
  //         placement="left"
  //         title={text}
  //         className="productName"
  //         style={{ width: 100 }}
  //       >
  //         <a className="link productEllipsis">{text}</a>
  //       </Tooltip>
  //     )
  // },
  // {
  //   title: "Issue",
  //   dataIndex: "issue",
  //   key: "issue",
  //   fixed: "right",
  //   width: 200
  // },
  // {
  //   title: "Sub Issue",
  //   dataIndex: "subIssue",
  //   key: "subIssue",
  //   fixed: "right",
  //   width: 200
  // }
];

export default class PredictionMoreTabContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      PaginationValue: 1,
      IsDataFetched: false,
      productId: props.productId,
      TotalData: 0
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    const { PaginationValue, productId } = this.state;
    this.fetchData(PaginationValue, productId);
  }

  fetchData = (pageIndex, productId = this.state.productId) => {
    this.setState({
      IsDataFetched: false
    });
    const data = {
      productId,
      pageIndex
    };
    this.dashboardAPI
      .service(DashboardVariables.CUSTOMER_DETAILS, data)
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
      <Row style={{ padding: 10, paddingTop: 0 }}>
        {TotalData !== 0 && (
          <Col xl={24} style={{ marginBottom: 10 }}>
            <Pagination
              style={{ float: "right" }}
              defaultCurrent={PaginationValue}
              onChange={this.handlePagination}
              total={TotalData}
            />
          </Col>
        )}
        <Col xl={24}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: "50vh" }}
            // pagination={{ pageSize: 10 }}
            pagination={false}
            loading={!IsDataFetched}
            locale={{
              emptyText: <RecordNotFound />
            }}
          />
        </Col>
      </Row>
    );
  }
}
