import React, { Component } from "react";
// import BubbleChart from "@weknow/react-bubble-chart-d3";
import { Row, Col } from "antd";
import _ from "lodash";
import * as d3 from "d3";
import { Colors } from "constants/themeConstants";

class BubbleChart extends React.Component {
  //   static propTypes = {
  //     data: React.PropTypes.array,
  //     width: React.PropTypes.number,
  //     height: React.PropTypes.number,
  //     useLabels: React.PropTypes.bool
  //   };

  static defaultProps = {
    data: [],
    useLabels: false,
    width: 600,
    height: 500
  };

  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;

    this.state = {
      data: []
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue =
        0.95 *
        d3.min(this.props.data, item => {
          return item.v;
        });

      this.maxValue =
        1.05 *
        d3.max(this.props.data, item => {
          return item.v;
        });

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([30, 80])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force(
        "collide",
        d3.forceCollide(d => {
          return this.radiusScale(d.v) + 2;
        })
      )
      .on("tick", () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.v;
      });

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.v;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      //   .range(["#eb001b", "#f79e1b"]);
      .range([Colors.red, Colors.green]);

    // render simple circle element
    if (!this.props.useLabels) {
      const circles = _.map(data, (item, index) => {
        return (
          <circle
            key={index}
            r={this.radiusScale(item.v)}
            cx={item.x}
            cy={item.y}
            fill={color(item.v)}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
          />
        );
      });

      return (
        <g
          transform={`translate(${this.props.width / 2}, ${this.props.height /
            2})`}
        >
          {circles}
        </g>
      );
    }

    // render circle and text elements inside a group
    const texts = _.map(data, (item, index) => {
      const props = this.props;
      const fontSize = this.radiusScale(item.v) / 6;
      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 + item.x}, ${props.height /
            2 +
            item.y})`}
        >
          <circle
            r={this.radiusScale(item.v)}
            fill={"#fff"}
            stroke={d3.rgb(color(item.v))}
            strokeWidth="2"
          />
          <text
            dy="6"
            fill="#000"
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="bold"
          >
            {item.l}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    if (this.state.data.length) {
      return (
        <svg width={this.props.width} height={this.props.height}>
          {this.renderBubbles(this.state.data)}
        </svg>
      );
    }

    return <div>Loading</div>;
  }
}

export default class ThemeExplorer extends Component {
  render() {
    // const rawdata = Array(10).map((e, i) => {
    //   return {
    //     v: _.random(10, 100)
    //   };
    // });
    const rawdata = _.map(_.range(10), () => {
      return {
        v: _.random(10, 100),
        l: "Sample"
      };
    });
    return (
      <Row>
        <Col xl={24} style={{ padding: 20, paddingTop: 10, paddingBottom: 10 }}>
          <Col xl={14}>
            {/* <BubbleChart
              className="cust"
              graph={{
                zoom: 1.1,
                offsetX: -0.05,
                offsetY: -0.01
              }}
              width={500}
              height={600}
              padding={0} // optional value, number that set the padding between bubbles
              showLegend={false} // optional value, pass false to disable the legend.
              legendPercentage={20} // number that represent the % of with that legend going to use.
              legendFont={{
                family: "Arial",
                size: 12,
                color: "#000",
                weight: "bold"
              }}
              valueFont={{
                family: "Arial",
                size: 12,
                color: "#fff",
                weight: "bold"
              }}
              labelFont={{
                family: "Arial",
                size: 16,
                color: "#fff",
                weight: "bold"
              }}
              //Custom bubble/legend click functions such as searching using the label, redirecting to other page
              bubbleClickFunc={this.bubbleClick}
              data={[
                { label: "CRM", value: 1 },
                { label: "API", value: 1 },
                { label: "Data", value: 1 },
                { label: "Commerce", value: 1 },
                { label: "AI", value: 3 },
                { label: "Management", value: 5 },
                { label: "Testing", value: 6 },
                { label: "Mobile", value: 9 },
                { label: "Conversion", value: 9 },
                { label: "Misc", value: 4 }
              ]}
            /> */}
            <Col className="bubbleContainer">
              <BubbleChart useLabels data={rawdata} />
            </Col>
          </Col>
          <Col xl={10}></Col>
        </Col>
      </Row>
    );
  }
}
