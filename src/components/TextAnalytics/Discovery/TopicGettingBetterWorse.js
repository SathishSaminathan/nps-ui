import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import {
  Col,
  Table,
  Icon,
  Popover,
  Radio,
  Input,
  Button,
  Pagination
} from "antd";
import { SelectComponent } from "components/shared/SelectComponent";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import Loader from "components/shared/Loader";
import ReadMore from "components/shared/ReadMore";

export default class SummaryOfTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Themes: [],
      TotalData: 0,
      data: [],
      ThemeFetched: false,
      isLoading: true,
      FilterValues: {
        yearly: "QUATERLY",
        pageIndex: 1,
        issueId: undefined,
        themeIsBetter: props.isBetter || false
      }
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getThemesDD();
    this.getData(this.state.FilterValues);
  }

  getData = FilterValues => {
    this.setState({
      isLoading: true
    });
    this.dashboardAPI
      .service(DashboardVariables.THEME_POSITIVE_WORSE, FilterValues)
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

  getThemesDD = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_THEMES)
      .then(res => {
        this.setState({
          Themes: res.data,
          ThemeFetched: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ThemeFetched: true
        });
      });
  };
  handleComparisionMonth = ({ target: { value } }) => {
    this.setState(
      {
        FilterValues: {
          ...this.state.FilterValues,
          yearly: value
        }
      },
      () => this.getData(this.state.FilterValues)
    );
  };

  handleProductChange = (value, type) => {
    this.setState(
      {
        FilterValues: {
          ...this.state.FilterValues,
          [type]: value,
          pageIndex: type === "issueId" ? 1 : value
        }
      },
      () => this.getData(this.state.FilterValues)
    );
  };

  render() {
    const columns = [
      {
        title: "Themes",
        dataIndex: "theme",
        key: "theme",
        width: "70%",
        render: text => <ReadMore lines={1}>{text}</ReadMore>
      },
      {
        title: "NPS",
        dataIndex: "npsScore",
        key: "npsScore",
        width: "15%"
      },
      {
        title: "Impact",
        dataIndex: "impact",
        key: "impact",
        width: "15%"
      }
    ];

    const { isBetter } = this.props;
    const {
      FilterValues: { yearly, issueId, pageIndex },
      Themes,
      ThemeFetched,
      TotalData,
      isLoading,
      data
    } = this.state;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    return (
      <Fragment>
        {isLoading && <Loader />}
        <Col xl={24}>
          <Col
            className="descTitleArea"
            style={{ paddingTop: 10, paddingBottom: 15 }}
          >
            <Col style={{ display: "flex", alignItems: "center" }}>
              <DescTitle style={{ fontSize: 15 }}>
                Which Themes are getting {isBetter ? "Better" : "Worse"}?
              </DescTitle>
              <Col style={{ width: 150, marginLeft: 10 }}>
                <SelectComponent
                  data={Themes}
                  defaultValue={issueId}
                  value={issueId}
                  placeholder="Select Theme"
                  handleProductChange={this.handleProductChange}
                  field="issueId"
                  loading={!ThemeFetched}
                />
              </Col>
            </Col>
            <Popover
              content={
                <div>
                  <Radio.Group
                    // value={size}
                    onChange={this.handleComparisionMonth}
                    defaultValue={yearly}
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
            dataSource={data}
            columns={columns}
            bordered
            pagination={false}
          />
        </Col>
        <Col xl={24} style={{ marginTop: 10 }}>
          <Pagination
            style={{ float: "right" }}
            current={pageIndex}
            onChange={value => this.handleProductChange(value, "pageIndex")}
            total={TotalData}
          />
        </Col>
      </Fragment>
    );
  }
}
