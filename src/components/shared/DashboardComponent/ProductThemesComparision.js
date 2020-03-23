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
      Product: undefined,
      FilteredValue: {
        comparisionMonth: "QUATERLY",
        isProduct: false,
        productId: null
      }
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    const { FilteredValue } = this.state;
    this.getProducts(FilteredValue);
  }

  getProducts = data => {
    this.dashboardAPI
      .service(DashboardVariables.COMPARISION_CHART_PRODUCT_DD, data)
      .then(res => {
        this.setState(
          {
            Products: res.data,
            FilteredValue: {
              ...this.state.FilteredValue,
              productId: res.data[0].value
            }
          },
          () => this.getChartData(this.state.FilteredValue)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      () => this.getProducts(this.state.FilteredValue)
    );
  };

  hadleProduct = (value, type) => {
    this.setState(
      {
        FilteredValue: {
          ...this.state.FilteredValue,
          productId: value
        }
      },
      () => this.getChartData(this.state.FilteredValue)
    );
  };

  render() {
    const {
      VOCResponse,
      Products,
      Product,
      FilteredValue: { comparisionMonth, productId }
    } = this.state;
    return (
      <Row>
        <Col xl={24} className="comparisionChartContainer">
          <Row className="comparisionChartFilterArea">
            <Col>
              <Row>
                <Col style={{ width: 200, marginRight: 10 }}>
                  <SelectComponent
                    allowClear={false}
                    data={Products}
                    defaultValue={productId}
                    placeholder="Select Product"
                    value={productId}
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
                          fontSize: 8,
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
