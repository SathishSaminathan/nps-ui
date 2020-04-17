import React, { Component } from "react";
import { Col, Row, Icon, Button, Drawer } from "antd";

import { Bar, Line } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";
import KPIComponent from "./KPIComponent";
import { SelectComponent } from "components/shared/SelectComponent";

export default class KPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "SPEED",
      drawerOpened: false,
    };
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpened: !this.state.drawerOpened,
    });
  };

  render() {
    const { drawerOpened } = this.state;

    const lineOptions = {
      // bezierCurve: true,
      // bezierCurveTension: 3.4,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              // display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    const options = {
      plugins: {
        datalabels: {
          display: false,
          align: "center",
          anchor: "center",
          color: "#000",
          font: {
            size: 18,
          },
        },
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              // display: false,
            },
            stacked: true,
          },
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: "No. of customers",
            },
            gridLines: {
              display: false,
            },
            // stacked: true,
          },
        ],
      },
    };

    let data = {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Member Agreement Tracker",
          backgroundColor: Colors.darkBlue,
          stack: "Stack 0",
          data: [66, 93, 31, 76, 39, 75, 36],
        },
        {
          label: "Employee On Boarding",
          backgroundColor: Colors.blue,
          stack: "Stack 0",
          data: [76, 203, 41, 86, 49, 85, 46],
        },
        {
          label: "Vendor Payment",
          backgroundColor: Colors.lightBlue,
          stack: "Stack 0",
          data: [76, 103, 41, 86, 49, 85, 46],
        },
        {
          label: "Employee On Boarding",
          backgroundColor: Colors.lightBlue,
          stack: "Stack 0",
          data: [56, 56, 83, 21, 66, 29, 65],
        },
      ],
    };

    let lineData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    return (
      <Row>
        <Col xl={24}>
          <Drawer
            title="Filter"
            placement="right"
            // closable={false}
            onClose={this.toggleDrawer}
            visible={drawerOpened}
            getContainer={false}
            // style={{ position: "absolute" }}
          >
            <Row>
              <Col style={{ paddingBottom: 10 }} xl={24}>
                <SelectComponent
                  data={[]}
                  // defaultValue={issueId}
                  // value={issueId}
                  placeholder="period"
                  // handleProductChange={this.handleProductChange}
                  field="issueId"
                  // loading={!ThemeFetched}
                />
              </Col>
              <Col style={{ paddingBottom: 10 }} xl={24}>
                <SelectComponent
                  data={[]}
                  // defaultValue={issueId}
                  // value={issueId}
                  placeholder="state"
                  // handleProductChange={this.handleProductChange}
                  field="issueId"
                  // loading={!ThemeFetched}
                />
              </Col>
              <Col style={{ paddingBottom: 10 }} xl={24}>
                <SelectComponent
                  data={[]}
                  // defaultValue={issueId}
                  // value={issueId}
                  placeholder="product"
                  // handleProductChange={this.handleProductChange}
                  field="issueId"
                  // loading={!ThemeFetched}
                />
              </Col>
              <Col xl={24}>
                <Button icon="filter" type="primary" style={{ width: "100%" }}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Drawer>
          <Button
            type="primary"
            icon="filter"
            size={"default"}
            style={{ position: "absolute", right: 0, zIndex: 2 }}
            onClick={this.toggleDrawer}
          />
          <Col className="page-header">
            <span class="text-uppercase page-subtitle">Satellite</span>
            <h3 class="+">KPI</h3>
          </Col>
          <Col xl={24}>
            <KPIComponent
              value={4}
              name="NPS(1-10)"
              customSegmentStops={[0, 3, 6, 10]}
              minValue={0}
              maxValue={10}
            />
            <KPIComponent
              value={2.6}
              name="CSAT(1-5)"
              customSegmentStops={[0, 1.5, 3.5, 5]}
              minValue={0}
              maxValue={5}
            />
            <KPIComponent
              value={8}
              name="CES(1-10)"
              customSegmentStops={[0, 3, 6, 10]}
              minValue={0}
              maxValue={10}
            />

            <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Col
                xl={24}
                className="border containerStyle"
                style={{ height: 242 }}
              >
                <Col
                  xl={18}
                  // style={{ height: 300 }}
                  className="moreValueContainer"
                >
                  <Row type="flex" justify="center">
                    <Col xl={24}>
                      <Row
                        type="flex"
                        justify="space-between"
                        className="moreValue"
                      >
                        <Col className="flex">
                          <Icon type="like" />
                        </Col>
                        <Col>
                          <span class="satelliteMainText">Promoters</span>
                        </Col>
                        <Col className="flex">
                          <span className="value">10.5%</span>
                        </Col>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        className="moreValue"
                      >
                        <Col className="flex">
                          <Icon type="dislike" rotate={90} />
                        </Col>
                        <Col>
                          <span class="satelliteMainText">Passives</span>
                        </Col>
                        <Col className="flex">
                          <span className="value">10.5%</span>
                        </Col>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        className="moreValue"
                      >
                        <Col className="flex">
                          <Icon type="dislike" />
                        </Col>
                        <Col>
                          <span class="satelliteMainText">Detractors</span>
                        </Col>
                        <Col className="flex">
                          <span className="value">10.5%</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Col>

            <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Col
                xl={24}
                className="border containerStyle"
                style={{ height: 242 }}
              >
                <Col xl={23} className="moreValueContainer">
                  <Bar data={data} options={options} legend={false} />
                </Col>
              </Col>
            </Col>

            <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Col
                xl={24}
                className="border containerStyle"
                style={{ height: 242 }}
              >
                <Col xl={23} className="moreValueContainer">
                  {/* <Bar data={data} options={options} legend={false} /> */}
                  <Line data={lineData} options={lineOptions} legend={false} />
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}
