import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import { Col, Table, Icon, Popover, Radio, Input, Button } from "antd";
import { Bar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      type: "line",
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderJoinStyle: "miter",
      borderColor: Colors.brick,
      backgroundColor: 'white',
      pointBorderColor: Colors.brick,
      pointBackgroundColor: "white",
      //   pointHoverBackgroundColor: "#EC932F",
    //   pointHoverBorderColor: "#EC932F",
      yAxisID: "y-axis-2"
    },
    {
      type: "bar",
      label: "Visitor",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: Colors.green,
      yAxisID: "y-axis-1"
    },
    {
      type: "bar",
      label: "Visitor",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: Colors.red,
      yAxisID: "y-axis-1"
    }
  ]
};

const options = {
  //   responsive: true,
  tooltips: {
    mode: "label"
  },
  elements: {
    line: {
      fill: false
    }
  },
  plugins: {
    datalabels: {
      display: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        }

        // labels: ["January", "February", "March", "April", "May", "June", "July"]
      }
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          display: false
        },
        labels: {
          show: false
        }
      }
    ]
  }
};

// const plugins = [
//   {
//     afterDraw: (chartInstance, easing) => {
//       const ctx = chartInstance.chart.ctx;
//       ctx.fillText("This text drawn by a plugin", 100, 100);
//     }
//   }
// ];

export default class ProductSentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisionMonth: "QUATERLY"
    };
  }

  handleComparisionMonth = ({ target: { value } }) => {
    this.setState({ comparisionMonth: value });
  };
  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const { comparisionMonth } = this.state;
    return (
      <Fragment>
        <Col xl={24}>
          <Col
            className="descTitleArea"
            style={{ paddingTop: 10, paddingBottom: 15 }}
          >
            <DescTitle style={{ fontSize: 15 }}>
              Product Sentiment and Score over time
            </DescTitle>
            <Popover
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
            </Popover>
          </Col>
        </Col>
        <Col xl={24}>
          <Bar data={data} options={options} height={50} />
        </Col>
      </Fragment>
    );
  }
}
