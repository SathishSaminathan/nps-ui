import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { isEqual } from "lodash";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import "./dashboard1.scss";
import Label from "../Label";
import { getRandomColors } from "helpers/validationHelpers";

export default class FilterChartComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      res: props.res
    };
  }

  componentWillReceiveProps(nextProps, prevState) {
    // console.log("nextProps", isEqual(nextProps.res, this.state.res));
    // console.log("nextProps", nextProps, this.state.res);
    if (!isEqual(nextProps.res, this.state.res)) {
      this.setState({
        res: nextProps.res
      });
    }
  }

  renderCharts = res => {
    return res.map((res, i) => (
      <Col
        xl={24}
        style={{
          height: 270,
          marginTop: 20
        }}
      >
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col xl={2} style={{ textAlign: "center" }}>
            <Label className={`${res.npsState}`} style={{ fontSize: 20 }}>
              {res.npsState}
            </Label>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Product Proportion</Label>
              </Col>
              <Col xl={24}>
                <Doughnut
                  data={getRandomColors(res.productChart, "DOUGHNUT")}
                  legend={false}
                  height={190}
                  options={{
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Themes Proportion</Label>
              </Col>
              <Col xl={24}>
                <Pie
                  data={getRandomColors(res.issueChart, "PIE")}
                  legend={false}
                  height={190}
                  options={{
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} style={{ height: "100%" }}>
            <Row style={{ height: "100%" }} type="flex" justify="space-between">
              <Col xl={24} style={{ textAlign: "center" }}>
                <Label>Customer Satisfaction</Label>
              </Col>
              <Col xl={24}>
                <Bar
                  data={getRandomColors(res.sentimentChart, "BAR")}
                  // legend={false}
                  height={180}
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
                          },
                          ticks: {
                            fontColor: "black",
                            fontSize: 8
                          }
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
                          },
                          ticks: {
                            fontColor: "black",
                            fontSize: 8
                          }
                        }
                      ]
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      datalabels: {
                        display: false
                      }
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4} style={{ textAlign: "center" }}>
            <p className="noMar">
              <Label>{res.customerCount ? res.customerCount : 0}</Label> of
              customers
            </p>
            <p className="noMar">
              <Label>₹{res.totalAmount ? res.totalAmount : 0}</Label>
            </p>
          </Col>
        </Row>
      </Col>
    ));
  };

  render() {
    const { res } = this.state;
    return this.renderCharts(res);
  }
}
