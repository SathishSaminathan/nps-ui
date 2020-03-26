import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import { Col, Table, Radio, Popover, Button, Pagination, Row } from "antd";
import { SelectComponent } from "components/shared/SelectComponent";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import Loader from "components/shared/Loader";
import ReadMore from "components/shared/ReadMore";

export default class SummaryOfTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      data: [],
      TotalData: 0,
      FilterValues: {
        Product: undefined,
        comparisionMonth: "QUATERLY",
        pageIndex: 1,
        productId: undefined
      },
      isLoading: true,
      ProductFetched: false
    };
    this.dashboardAPI = new DashboardServices();
  }

  getProductDD = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_PRODUCTS)
      .then(res => {
        console.log(res);
        this.setState({
          Products: res.data,
          ProductFetched: true
        });
      })
      .catch(err => {
        this.setState({
          ProductFetched: true
        });
        console.log(err);
      });
  };

  componentDidMount() {
    this.getProductDD();
    this.getChartData(this.state.FilterValues);
  }

  getChartData = FilterValues => {
    this.setState({
      isLoading: true
    });
    this.dashboardAPI
      .service(DashboardVariables.DISCOVERY_SUMMARY, FilterValues)
      .then(res => {
        this.setState({
          data: res.data.results,
          TotalData: res.data.totalData,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
      });
  };

  handleComparisionMonth = ({ target: { value } }) => {
    this.setState({ comparisionMonth: value });
  };

  handleProductChange = (value, type) => {
    this.setState(
      {
        FilterValues: { ...this.state.FilterValues, [type]: value }
      },
      () => this.getChartData(this.state.FilterValues)
    );
  };

  render() {
    const columns = [
      {
        title: "",
        dataIndex: "product",
        key: "product",
        width: "20%",
        render:(text)=> <ReadMore lines={1}>{text}</ReadMore>
      },
      {
        title: "NPS",
        dataIndex: "npsScore",
        key: "npsScore",
        width: "10%"
      },
      {
        title: "# of Responses",
        dataIndex: "noOfResponse",
        key: "noOfResponse",
        width: "15%"
      },
      {
        title: "% of Responses",
        dataIndex: "responsePercentage",
        key: "responsePercentage",
        width: "15%"
      },
      {
        title: "What % of the Product is Positive?",
        dataIndex: "positivePercentage",
        key: "positivePercentage",
        width: "20%"
      },
      {
        title: "What % of the Product is Negative?",
        dataIndex: "negativePercentage",
        key: "negativePercentage",
        width: "20%"
      }
    ];

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    const {
      FilterValues: { comparisionMonth, productId, pageIndex },
      Products,
      ProductFetched,
      TotalData,
      data,
      isLoading
    } = this.state;

    return (
      <Row>
        {isLoading && <Loader />}
        <Col
          className="descTitleArea"
          style={{ paddingTop: 10, paddingBottom: 15 }}
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <DescTitle style={{ fontSize: 15 }}>Summary of Products</DescTitle>
            <Col style={{ width: 150, marginLeft: 10 }}>
              <SelectComponent
                data={Products}
                defaultValue={productId}
                value={productId}
                placeholder="Select Product"
                handleProductChange={this.handleProductChange}
                field="productId"
                loading={!ProductFetched}
              />
            </Col>
          </Col>
          {/* <Popover
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
          </Popover> */}
        </Col>
        <Col xl={24}>
          <Table
            className="summaryOfTopics"
            dataSource={data}
            columns={columns}
            bordered
            pagination={false}
          />
        </Col>
        <Col xl={24} style={{ marginTop: 10 }}>
          <Pagination
            style={{ float: "right" }}
            defaultCurrent={pageIndex}
            onChange={value => this.handleProductChange(value, "pageIndex")}
            total={TotalData}
          />
        </Col>
      </Row>
    );
  }
}
