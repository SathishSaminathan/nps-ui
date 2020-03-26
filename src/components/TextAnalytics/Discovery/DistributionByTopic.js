import React, { Component, Fragment } from "react";
import { Col, Popover, Radio, Button } from "antd";

import DescTitle from "components/shared/DescTitle";
import { HorizontalBar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import { getRandomColors } from "helpers/validationHelpers";
import Loader from "components/shared/Loader";

const products = [
  "Consumer Loan",
  "Bank account or service",
  "Credit card",
  "Credit card or prepaid card",
  "Debt collection",
  "Mortgage"
];

const data = {
  type: "horizontalBar",
  labels: products,
  datasets: [
    {
      label: "# of Votes 1",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red,
        Colors.red
      ]
      //   borderColor: [
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)",
      //     "rgba(255,99,132,1)"
      //   ],
      //   borderWidth: 2
    },
    {
      label: "# of Votes 2",
      data: [15, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow,
        Colors.yellow
      ]
    },
    {
      label: "# of Votes 3",
      data: [15, 19, 3, 5, 2, 3],
      backgroundColor: [
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.green,
        Colors.greenr
      ]
    }
  ]
};

export default class DistributionByTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FilterValues: {
        comparisionMonth: "QUATERLY",
        dataLength: "5"
      },
      ChartResponse: [],
      isLoading: true
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData(this.state.FilterValues);
  }
  getChartData = FilterValues => {
    this.setState({
      isLoading: true
    });
    this.dashboardAPI
      .service(DashboardVariables.DISCOVERY_CHART, FilterValues)
      .then(res => {
        this.setState({
          ChartResponse: res.data,
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

  handleDataLength = ({ target: { value } }) => {
    // this.setState({
    //   FilterValues: { ...this.state.FilterValues, comparisionMonth: value }
    // });
    this.setState(
      {
        FilterValues: { ...this.state.FilterValues, dataLength: value }
      },
      () => this.getChartData(this.state.FilterValues)
    );
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    const {
      FilterValues: { comparisionMonth, dataLength },
      ChartResponse,
      isLoading
    } = this.state;
    return (
      <Fragment>
        {isLoading && <Loader />}
        <Col
          className="descTitleArea"
          style={{ paddingTop: 10, paddingBottom: 15 }}
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <DescTitle style={{ fontSize: 15 }}>
              NPS distribution by Products
            </DescTitle>
            <Col style={{ marginLeft: 10 }}>
              <Radio.Group
                // value={size}
                onChange={this.handleDataLength}
                defaultValue={dataLength}
              >
                <Radio.Button value="5">Top 5</Radio.Button>
                <Radio.Button value="10">Top 10</Radio.Button>
                <Radio.Button value="15">Top 15</Radio.Button>
              </Radio.Group>
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
          <HorizontalBar
            height={180}
            options={{
              tooltips: {
                enabled: true // to hide tooltips
              },
              legend: {
                position: "bottom"
                //   display: false
              },
              scales: {
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      // display: false //this will remove only the label
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ],
                yAxes: [
                  {
                    stacked: true,
                    ticks: {
                      // display: false //this will remove only the label
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ]
              },
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  // display: "auto",
                  display: false
                }
              }
            }}
            // data={data}
            data={
              ChartResponse.length !== 0
                ? getRandomColors(ChartResponse, "BAR", [
                    Colors.green,
                    Colors.yellow,
                    Colors.red
                  ])
                : []
            }
          />
        </Col>
      </Fragment>
    );
  }
}
