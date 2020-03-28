import React, { Component, Fragment } from "react";
import { Row, Radio, Icon, Col, Table } from "antd";

import { SelectComponent } from "components/shared/SelectComponent";
import { ChartContants, SentimentConstants } from "constants/AppConstants";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { Colors } from "constants/themeConstants";

const dataSource = [
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.HAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  },
  {
    name: "Mike",
    comment: "kjfdgvkjsdfsdfgsdf",
    sentiment: SentimentConstants.UNHAPPY
  }
];

export default class ThemePhrases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VOCResponse: [],
      Themes: [],
      data: [],
      ThemeFetched: false,
      isLoading: true,
      FilterValues: {
        issueId: undefined,
        sentiment: "ALL"
      }
    };
    this.dashboardAPI = new DashboardServices();
  }
  componentDidMount() {
    this.getThemesDD();
  }
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
  handleProductChange = (value, type) => {
    this.setState(
      {
        FilterValues: {
          ...this.state.FilterValues,
          [type]: value,
          pageIndex: type === "issueId" ? 1 : value
        }
      },
      () => this.this.getChartData0(this.state.FilterValues)
    );
  };
  render() {
    const config = {
      [SentimentConstants.HAPPY]: "smile",
      [SentimentConstants.UNHAPPY]: "frown"
    };
    const {
      VOCResponse,
      FilterValues: { yearly, issueId, chartType, sentiment },
      Themes,
      ThemeFetched,
      TotalData,
      isLoading,
      data
    } = this.state;

    const columns = [
      {
        dataIndex: "sentiment",
        key: "sentiment",
        width: "8%",
        align: "center",
        render: text => (
          <Icon
            type={config[text]}
            style={{
              color:
                text === SentimentConstants.HAPPY
                  ? Colors.green
                  : Colors.primaryButtonColor
            }}
          />
        )
      },
      {
        dataIndex: "comment",
        key: "comment"
      }
    ];
    return (
      <Fragment>
        <Row
          type="flex"
          justify="space-between"
          style={{ padding: 10, width: "100%" }}
        >
          <Col style={{ width: 150 }}>
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
          <Col>
            <Radio.Group
              // value={size}
              onChange={e => {
                this.setState({
                  FilterValues: {
                    ...this.state.FilterValues,
                    sentiment: e.target.value
                  }
                });
              }}
              value={sentiment}
            >
              <Radio.Button value={"ALL"}>All</Radio.Button>
              <Radio.Button value={SentimentConstants.HAPPY}>
                <Icon type="smile" style={{ color: Colors.green }} />
              </Radio.Button>
              <Radio.Button value={SentimentConstants.UNHAPPY}>
                <Icon
                  type="frown"
                  style={{ color: Colors.primaryButtonColor }}
                />
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col xl={24} style={{ padding: 5 }}>
            <Table
              className="themePrasesTable"
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 13 }}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
