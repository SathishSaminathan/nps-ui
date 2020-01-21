import React, { Component } from "react";
import { Row, Col } from "antd";
import moment from "moment";

import { Colors } from "constants/themeConstants";
import BarChart from "components/shared/Charts/BarChart";

import "./textAnalytics.scss";
import TextServices from "services/textServices";
import { TextAnalyticsVariables } from "constants/APIConstants";
import LineChart from "components/shared/Charts/LineChart";
import response from "./data";
import Filters from "components/Filters";

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
      barChartData: barChartData
    };
  };

  generateDatasetForBarChart = textAnalyticsData => {
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

  getLineChartData = () => {
    setTimeout(() => {
      this.generateDatasetForLineChart(response.Sheet1);
      this.generateDatasetForBarChart(response.Sheet1);
    }, 1500);
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

  generateDatasetForLineChart = textAnalyticsData => {
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
  componentDidMount() {
    this.getLineChartData();
  }
  render() {
    const { data, barChartData } = this.state;
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
        <Col xl={18}>
          {/* <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: Colors.negativeColor
            }}
          ></div> */}
          <Col className="topContainer">
            <Row className="headerArea">
              <Col className="header">Products</Col>
              <Col>
                <div className="top">Top Products</div>
              </Col>
            </Row>
            <Row style={{ paddingLeft: 10 }}>
              <Col>
                <LineChart data={data} />
              </Col>
              <Col>
                <BarChart data={barChartData} />
              </Col>
            </Row>
          </Col>
        </Col>
        <Col xl={6}>
          <Filters products={products} />
        </Col>
      </Row>
    );
  }
}
