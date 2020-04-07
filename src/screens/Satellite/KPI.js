import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Col, Row, Radio, Icon, Button, Drawer } from "antd";

import Label from "components/shared/Label";
import MapChart from "./MapChart";
import { Bar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";

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
    const { type, drawerOpened } = this.state;
    const segmentColors = ["#70bff8", "#7bccf7", "#a8e3f3"];
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
              display: false,
            },
            stacked: true,
          },
        ],
        yAxes: [
          {
            ticks: {
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

    return (
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
          <p>Some contents...</p>
        </Drawer>
        <Col className="page-header">
          <span class="text-uppercase page-subtitle">Satellite</span>
          <h3 class="+">KPI</h3>
        </Col>
        <Col xl={24}>
          <Col xl={24} style={{ marginTop: 10, marginBottom: 10 }}>
            <Col style={{ float: "right" }}>
              <Button
                type="primary"
                icon="filter"
                size={"default"}
                style={{ marginRight: 10 }}
                onClick={this.toggleDrawer}
              />
              <Radio.Group
                // value={size}
                onChange={(e) => this.setState({ type: e.target.value })}
                defaultValue={type}
              >
                <Radio.Button value="SPEED">
                  <Icon type="dashboard" />
                </Radio.Button>
                <Radio.Button value="MAP">
                  <Icon type="compass" />
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Col>
          <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Col
              xl={24}
              className="border containerStyle"
              style={{ paddingLeft: 8, paddingRight: 8 }}
            >
              <Label style={{ marginBottom: 20 }}>NPS(1-10)</Label>
              {type === "SPEED" ? (
                <ReactSpeedometer
                  value={4}
                  height={120}
                  width={190}
                  ringWidth={20}
                  customSegmentStops={[0, 3, 6, 10]}
                  // segmentColors={segmentColors}
                  startColor={segmentColors[0]}
                  endColor={segmentColors[2]}
                  minValue={0}
                  maxValue={10}
                  needleTransitionDuration={4000}
                  needleTransition="easeElastic"
                />
              ) : (
                <MapChart style={{ height: 124 }} />
              )}
            </Col>
          </Col>
          <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Col xl={24} className="border containerStyle">
              <Label style={{ marginBottom: 20 }}>CSAT (1-5)</Label>
              {type === "SPEED" ? (
                <ReactSpeedometer
                  value={2.6}
                  height={120}
                  width={190}
                  ringWidth={20}
                  customSegmentStops={[0, 1.5, 3.5, 5]}
                  segmentColors={segmentColors}
                  minValue={0}
                  maxValue={5}
                  needleTransitionDuration={5000}
                  needleTransition="easeElastic"
                />
              ) : (
                <MapChart style={{ height: 124 }} />
              )}
            </Col>
          </Col>
          <Col xl={8} style={{ paddingLeft: 8 }}>
            <Col xl={24} className="border containerStyle">
              <Label style={{ marginBottom: 20 }}>CES(1-10)</Label>
              {type === "SPEED" ? (
                <ReactSpeedometer
                  value={8}
                  height={120}
                  width={190}
                  ringWidth={20}
                  customSegmentStops={[0, 3, 6, 10]}
                  segmentColors={segmentColors}
                  minValue={0}
                  maxValue={10}
                  needleTransitionDuration={6000}
                  needleTransition="easeElastic"
                />
              ) : (
                <MapChart style={{ height: 124 }} />
              )}
              <Col></Col>
            </Col>
          </Col>

          <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Col xl={24} className="border containerStyle">
              <Col
                xl={15}
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
                <Bar data={data} options={options} legend={false} />
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    );
  }
}
