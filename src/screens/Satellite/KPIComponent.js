import React, { Component } from "react";
import { Col, Radio, Icon } from "antd";
import Label from "components/shared/Label";
import ReactSpeedometer from "react-d3-speedometer";
import MapChart from "./MapChart";

export default class KPIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "SPEED",
    };
  }
  render() {
    const { type, drawerOpened } = this.state;
    const { value, customSegmentStops, name } = this.props;
    const segmentColors = ["#70bff8", "#7bccf7", "#a8e3f3"];
    return (
      <Col xl={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Radio.Group
          style={{ float: "right", paddingBottom: 5 }}
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
        <Col
          xl={24}
          className="border containerStyle"
          style={{ paddingLeft: 8, paddingRight: 8 }}
        >
          <Label style={{ marginBottom: 20 }}>{name}</Label>
          {type === "SPEED" ? (
            <ReactSpeedometer
              value={value}
              height={120}
              width={190}
              ringWidth={20}
              customSegmentStops={customSegmentStops}
              // segmentColors={segmentColors}
              startColor={segmentColors[0]}
              endColor={segmentColors[2]}
              minValue={0}
              maxValue={10}
              needleTransitionDuration={4000}
              needleTransition="easeElastic"
              {...this.props}
            />
          ) : (
            <MapChart style={{ height: 126 }} />
          )}
        </Col>
      </Col>
    );
  }
}
