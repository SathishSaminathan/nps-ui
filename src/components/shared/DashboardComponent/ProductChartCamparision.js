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
      VOCResponse: []
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_VOC)
      .then(res => {
        this.setState({
          VOCResponse: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { VOCResponse } = this.state;
    return (
      <Row>
        <Col xl={24} className="comparisionChartContainer">
          <Row className="comparisionChartFilterArea">
            <Col>
              <Row>
                <Col>
                  <Radio.Group
                  // value={size}
                  // onChange={this.handleSizeChange}
                  >
                    <Radio.Button value="large">Monthly</Radio.Button>
                    <Radio.Button value="Quaterly">Quaterly</Radio.Button>
                    <Radio.Button value="default">6 Months</Radio.Button>
                    <Radio.Button value="small">Yearly</Radio.Button>
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
