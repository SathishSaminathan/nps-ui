import React, { Component, Fragment } from "react";
import { Row, Radio, Icon, Col, Table } from "antd";

import { SelectComponent } from "components/shared/SelectComponent";
import { ChartContants, SentimentConstants } from "constants/AppConstants";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { Colors } from "constants/themeConstants";
import ReadMore from "components/shared/ReadMore";

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
      dataSource: [],
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
    this.getMessages(this.state.FilterValues);
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

  getMessages = data => {
    this.setState({
      isLoading: true
    });
    this.dashboardAPI
      .service(DashboardVariables.THEME_EXPLORER_PHRASES, data)
      .then(res => {
        this.setState({
          dataSource: res.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ThemeFetched: true,
          isLoading: false
        });
      });
  };
  handleProductChange = (value, type) => {
    this.setState(
      {
        FilterValues: {
          ...this.state.FilterValues,
          [type]: value
          // pageIndex: type === "issueId" ? 1 : value
        }
      },
      () => this.getMessages(this.state.FilterValues)
    );
  };
  render() {
    const config = {
      [SentimentConstants.HAPPY]: "smile",
      [SentimentConstants.UNHAPPY]: "frown"
    };
    const {
      dataSource,
      FilterValues: { yearly, issueId, chartType, sentiment },
      Themes,
      ThemeFetched,
      TotalData,
      isLoading,
      data
    } = this.state;

    const color = {
      GREEN: "green",
      YELLOW: "yellow",
      RED: "red",
      GREY: "lightgrey"
    };

    const columns = [
      {
        dataIndex: "phraseType",
        key: "phraseType",
        width: "8%",
        align: "center",
        render: text => (
          <Icon
            type={"smile"}
            style={{
              color: color[text]
            }}
          />
        )
      },
      {
        dataIndex: "message",
        key: "message",
        render: text => <ReadMore lines={1}>{text}</ReadMore>
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
                this.setState(
                  {
                    FilterValues: {
                      ...this.state.FilterValues,
                      sentiment: e.target.value
                    }
                  },
                  () => this.getMessages(this.state.FilterValues)
                );
              }}
              value={sentiment}
            >
              <Radio.Button value={"ALL"}>All</Radio.Button>
              <Radio.Button value={SentimentConstants.GREEN}>
                <Icon type="smile" style={{ color: color.GREEN }} />
              </Radio.Button>
              <Radio.Button value={SentimentConstants.YELLOW}>
                <Icon type="smile" style={{ color: color.YELLOW }} />
              </Radio.Button>
              <Radio.Button value={SentimentConstants.RED}>
                <Icon type="smile" style={{ color: color.RED }} />
              </Radio.Button>
              <Radio.Button value={SentimentConstants.GREY}>
                <Icon type="smile" style={{ color: color.GREY }} />
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
              loading={isLoading}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
