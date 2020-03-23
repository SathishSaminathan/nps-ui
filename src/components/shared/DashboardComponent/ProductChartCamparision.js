import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { getRandomColors } from "helpers/validationHelpers";
import { Row, Col, Select, Radio } from "antd";

const { Option } = Select;

export default class ProductChartCamparision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VOCResponse: [],
      FilteredValue: {
        comparisionMonth: "QUATERLY",
        isProduct: true
      }
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData(this.state.FilteredValue);
  }

  getChartData = data => {
    this.dashboardAPI
      .service(DashboardVariables.COMPARISION_CHART, data)
      .then(res => {
        this.setState({
          VOCResponse: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleComparisionMonth = ({ target: { value } }) => {
    this.setState(
      {
        FilteredValue: { ...this.state.FilteredValue, comparisionMonth: value }
      },
      () => this.getChartData(this.state.FilteredValue)
    );
  };

  render() {
    const {
      VOCResponse,
      FilteredValue: { comparisionMonth }
    } = this.state;
    return (
      <Row>
        <Col xl={24} className="comparisionChartContainer">
          <Row className="comparisionChartFilterArea">
            <Col>
              <Row>
                <Col>
                  <Radio.Group
                    // value={size}
                    onChange={this.handleComparisionMonth}
                    defaultValue={comparisionMonth}
                  >
                    <Radio.Button value="QUATERLY">Quaterly</Radio.Button>
                    <Radio.Button value="HALF_YEARLY">Half Yearly</Radio.Button>
                    <Radio.Button value="YEARLY">Yearly</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Col>
            {VOCResponse.length !== 0 && (
              <Bar
                data={getRandomColors(VOCResponse, "BAR")}
                // legend={false}
                height={60}
                options={{
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          // fontSize: 8,
                          callback: function(label, index, labels) {
                            if (/\s/.test(label)) {
                              return label.split(" ");
                            } else {
                              return label;
                            }
                          }
                        },
                        display: true,
                        scaleLabel: {
                          display: true,
                          // labelString: "X axe name",
                          fontColor: "#000000",
                          fontSize: 10
                        },
                        gridLines: {
                          display: false
                        }
                        // ticks: {
                        //   fontColor: "black",
                        //   fontSize: 8
                        // }
                      }
                    ],
                    yAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          // labelString: "Y axe name",
                          fontColor: "#000000",
                          fontSize: 10
                        },
                        gridLines: {
                          display: false
                        }
                        // ticks: {
                        //   fontColor: "black",
                        //   fontSize: 8
                        // }
                      }
                    ]
                  },
                  plugins: {
                    datalabels: {
                      display: false
                    }
                  }
                }}
              />
            )}
          </Col>
        </Col>
      </Row>
    );
  }
}
