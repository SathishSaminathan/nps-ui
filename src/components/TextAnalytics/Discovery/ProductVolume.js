import React, { Component, Fragment } from "react";
import DescTitle from "components/shared/DescTitle";
import { Col, Table, Icon, Popover, Radio, Input, Button } from "antd";
import { Bar } from "react-chartjs-2";
import { Colors } from "constants/themeConstants";
import DashboardServices from "services/dashboardServices";
import { DashboardVariables } from "constants/APIConstants";
import Loader from "components/shared/Loader";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      type: "line",
      data: [51, 200, 40, 49, 60, 37, 40],
      fill: false,
      borderJoinStyle: "miter",
      borderColor: Colors.blue,
      //   backgroundColor: "#EC932F",
      pointBorderColor: Colors.darkBlue,
      pointBackgroundColor: "white",
      lineTension: 0.1,
      pointRadius: 4,
      pointBorderWidth: 2,
      //   pointHoverBackgroundColor: "#EC932F",
      //   pointHoverBorderColor: "#EC932F",
      yAxisID: "y-axis-1"
    },
    {
      type: "bar",
      label: "Visitor",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: Colors.darkBlue,
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
  legend: {
    position: "bottom"
    //   display: false
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

export default class ProductVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      FilterValues: {
        yearly: "QUATERLY"
      },
      isLoading: true
    };
    this.dashboardAPI = new DashboardServices();
  }

  componentDidMount() {
    this.getChartData(this.state.FilterValues);
  }

  getChartData = FilterValues => {
    this.setState({
      isLoading: true
    });
    this.dashboardAPI
      .service(DashboardVariables.VOLUME_CHART, FilterValues)
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
      });
  };

  renderChartData = res => {
    let data = res;
    data = {
      ...data,
      datasets: [
        {
          type: "line",
          fill: false,
          borderJoinStyle: "miter",
          borderColor: Colors.blue,
          //   backgroundColor: "#EC932F",
          pointBorderColor: Colors.darkBlue,
          pointBackgroundColor: "white",
          lineTension: 0.1,
          pointRadius: 4,
          pointBorderWidth: 2,
          //   pointHoverBackgroundColor: "#EC932F",
          //   pointHoverBorderColor: "#EC932F",
          yAxisID: "y-axis-1",
          ...data.datasets[1]
        },
        {
          type: "bar",
          fill: false,
          backgroundColor: Colors.darkBlue,
          yAxisID: "y-axis-1",
          ...data.datasets[0]
        }
      ]
    };
    return data;
  };

  handleComparisionMonth = ({ target: { value } }) => {
    this.setState(
      {
        FilterValues: { ...this.state.FilterValues, yearly: value }
      },
      () => this.getChartData(this.state.FilterValues)
    );
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const {
      FilterValues: { yearly },
      data,
      isLoading
    } = this.state;
    return (
      <Fragment>
        {isLoading && <Loader/>}
        <Col xl={24}>
          <Col
            className="descTitleArea"
            style={{ paddingTop: 10, paddingBottom: 15 }}
          >
            <DescTitle style={{ fontSize: 15 }}>
              Product Volume over time
            </DescTitle>
            <Popover
              content={
                <div>
                  <Radio.Group
                    // value={size}
                    onChange={this.handleComparisionMonth}
                    defaultValue={yearly}
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
          <Bar
            data={data ? this.renderChartData(data) : []}
            options={options}
            height={50}
          />
        </Col>
      </Fragment>
    );
  }
}
