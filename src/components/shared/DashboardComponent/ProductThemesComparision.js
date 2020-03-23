import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { DashboardVariables } from "constants/APIConstants";
import DashboardServices from "services/dashboardServices";
import { getRandomColors } from "helpers/validationHelpers";
import { Row, Col, Select, Radio } from "antd";
import { SelectComponent } from "../SelectComponent";

const { Option } = Select;

export default class ProductThemesComparision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VOCResponse: [],
      Products: [],
      Product: undefined
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData();
    this.getProducts();
  }

  getProducts = () => {
    this.dashboardAPI
      .service(DashboardVariables.GET_PRODUCTS)
      .then(res => {
        console.log(res);
        this.setState({
          Products: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  hadleProduct = (value, type) => {
    this.setState({
      [type]: value
    });
  };

  render() {
    const { VOCResponse, Products, Product } = this.state;
    return (
      <Row>
        <Col xl={24} className="comparisionChartContainer">
          <Row className="comparisionChartFilterArea">
            <Col>
              <Row>
                <Col style={{ width: 200, marginRight: 10 }}>
                  <SelectComponent
                    data={Products}
                    defaultValue={Product}
                    placeholder="Select Product"
                    value={Product}
                    handleProductChange={this.hadleProduct}
                    field="Product"
                  />
                </Col>
              </Row>
            </Col>
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
