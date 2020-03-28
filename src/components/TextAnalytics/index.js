import React, { Component } from "react";
import { Row, Col, Tabs, Icon } from "antd";

import moment from "moment";

import { Colors } from "constants/themeConstants";
import BarChart from "components/shared/Charts/BarChart";

import "./textAnalytics.scss";
import TextServices from "services/textServices";
import { TextAnalyticsVariables } from "constants/APIConstants";
import LineChart from "components/shared/Charts/LineChart";
import response from "./data";
import Filters from "components/Filters";
import HeaderComponent from "components/shared/HeaderComponent";
import Discovery from "./Discovery"
import ThemeExplorer from "./ThemeExplorer";

const { TabPane } = Tabs;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const products = [
  "Consumer Loan",
  "Bank account or service",
  "Credit card",
  "Credit card or prepaid card",
  "Debt collection",
  "Mortgage",
  "Other financial service",
  "Payday loan",
  "Prepaid card"
];

const barChartData = {
  type: "horizontalBar",
  labels: products,
  datasets: [
    {
      label: "Positive",
      backgroundColor: Colors.positiveColor,
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 0,
      //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //   hoverBorderColor: "rgba(255,99,132,1)",
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Negative",
      backgroundColor: Colors.negativeColor,
      borderColor: "rgba(255,99,132,1)",
      //   borderWidth: 1,
      //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //   hoverBorderColor: "rgba(255,99,132,1)",
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

const datum = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class TextAnalytics extends Component {
  constructor(props) {
    super(props);
    this.api = new TextServices();
    this.state = this.emptyState();
  }

  emptyState = () => {
    return {
      textAnalyticsData: null,
      working: false,
      data: [],
      barChartData: barChartData,
      response: response.Sheet1,
      filteredResponse: response.Sheet1,
      products: products,
      states: []
    };
  };

  componentDidMount() {
    const { response, products } = this.state;
    this.getLineChartData(response, products);
    this.generateStates(response);
  }

  generateStates = response => {
    let states = [...new Set(response.map(data => data.State))];
    this.setState({
      states
    });
  };

  generateDatasetForBarChart = (textAnalyticsData, products) => {
    const positiveData = [];
    const negativeData = [];
    products.map(product => {
      let positive = 0;
      let negative = 0;
      textAnalyticsData.map(data => {
        if (data.Product === product) {
          if (data.Sentiment === "Negative") negative = negative + 1;
          else positive = positive + 1;
        }
      });
      positiveData.push(positive);
      negativeData.push(negative);
    });
    this.setState({
      barChartData: {
        ...barChartData,
        datasets: [
          {
            ...this.state.barChartData.datasets[0],
            data: positiveData
          },
          {
            ...this.state.barChartData.datasets[1],
            data: negativeData
          }
        ]
      }
    });
  };

  getLineChartData = (response, products) => {
    // setTimeout(() => {
    this.generateDatasetForLineChart(response, products);
    this.generateDatasetForBarChart(response, products);
    // }, 1500);
    // this.api
    //   .service(TextAnalyticsVariables.GET_DATA)
    //   .then(res => {
    //     console.log(res);
    //     // debugger
    //     this.setState(
    //       {
    //         textAnalyticsData: res.data.Sheet1
    //       },
    //       () => this.generateDataset(this.state.textAnalyticsData)
    //     );
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  getMonthWiseData = (product, textAnalyticsData) => {
    let data = months.map((month, i) => {
      // return this.monthCalc(product, textAnalyticsData, month);
      let count = 0;
      textAnalyticsData.forEach(data => {
        if (data.Product === product) {
          if (
            month === months[parseInt(data["Date-Received"].split("/")[0]) - 1]
          ) {
            count = count + 1;
          }
        }
      });
      return count;
    });
    return data;
  };

  monthCalc = (product, textAnalyticsData, month) => {
    let count = 0;

    textAnalyticsData.forEach(data => {
      if (data.Product === product) {
        if (
          month === months[parseInt(data["Date-Received"].split("/")[0]) - 1]
        ) {
          count = count + 1;
        }
      }
    });
    return count;
  };

  generateDatasetForLineChart = (textAnalyticsData, products) => {
    let dataset = [];
    products.map((product, i) => {
      const color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ")";
      return dataset.push({
        ...datum.datasets[0],
        label: product,
        data: this.getMonthWiseData(product, textAnalyticsData),
        borderColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color
      });
    });
    this.setState({
      data: {
        ...datum,
        datasets: dataset
      }
    });
  };

  handleFilter = (value, type) => {
    const { response, products } = this.state;
    if (type === "Age") {
      const age = value.split(":");

      this.setState(
        {
          filteredResponse: value
            ? response.filter(
                data =>
                  parseInt(data[type]) >= age[0] &&
                  parseInt(data[type]) <= age[0]
              )
            : response
        },
        () => this.getLineChartData(this.state.filteredResponse, products)
      );
      return;
    }
    this.setState(
      {
        filteredResponse:
          value && value !== "Both"
            ? response.filter(data => data[type] === value)
            : response
      },
      () => this.getLineChartData(this.state.filteredResponse, products)
    );
  };
  render() {
    const { data, barChartData, states } = this.state;
    return (
      // <Row>
      //   <Col xl={8} className="overallPattern">
      //     <Col style={{ height: 600 }}>
      //       <BarChart title="Overall Pattern" />
      //     </Col>
      //   </Col>
      //   <Col xl={8} className="subPattern">
      //     <Col style={{ height: 600 }}>
      //       <BarChart title="Sub Patterns" />
      //     </Col>
      //   </Col>
      //   <Col xl={8} className="commentSection">
      //     <Col style={{ height: 600 }}>
      //       <h2>Comment Sections</h2>
      //       <Row className="comment">
      //         <Col xl={24}>
      //           <Col xl={6} className="imageDetailArea">
      //             <Row>
      //               <Col xl={24} className="imageArea">
      //                 <img
      //                   className="image"
      //                   src="https://randomuser.me/api/portraits/men/73.jpg"
      //                 />
      //               </Col>
      //               <Col xl={24} className="detailArea">
      //                 <Col className="name">SathishSaminathan</Col>
      //                 <Col className="mail">Sathis@gmail.com</Col>
      //                 {/* <Col className="work">Design @ NPS</Col> */}
      //               </Col>
      //             </Row>
      //           </Col>
      //           <Col xl={18} className="commentText">
      //             <p>
      //               Lorem Ipsum is simply dummy text of the printing and
      //               typesetting industry. Lorem Ipsum has been the industry's
      //               standard dummy text ever since the 1500s, when an unknown
      //               printer took a galley of type and scrambled it to make a
      //               type specimen book.
      //             </p>
      //           </Col>
      //         </Col>
      //       </Row>
      //     </Col>
      //   </Col>
      // </Row>
      <Row>
        <HeaderComponent title={"Text Analysis"} />
        <Col xl={24}>
          <Tabs defaultActiveKey="1" className="headerTabs">
            <TabPane tab={<span>Discovery</span>} key="1">
              <Discovery/>
            </TabPane>
            <TabPane tab={<span>Theme Explorer</span>} key="2">
              <ThemeExplorer/>
            </TabPane>
            <TabPane tab={<span>Previous</span>} key="3">
              <Col xl={18}>
                <Col className="topContainer">
                  <Col>
                    <div className="top">Top Themes</div>
                  </Col>
                  <Row style={{ paddingLeft: 10 }}>
                    <Col style={{ height: "30vh" }}>
                      <LineChart data={data} />
                    </Col>
                    <Col style={{ paddingTop: 50 }}>
                      <BarChart data={barChartData} />
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col xl={6}>
                <Filters
                  states={states}
                  handleFilter={this.handleFilter}
                  products={products}
                />
              </Col>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}
