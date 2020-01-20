import React, { Component } from "react";
import { Row, Col } from "antd";

import BarChart from "components/shared/Charts/BarChart";

import "./textAnalytics.scss";
import TextServices from "services/textServices";
import { TextAnalyticsVariables } from "constants/APIConstants";
import LineChart from "components/shared/Charts/LineChart";

export default class TextAnalytics extends Component {
  constructor(props) {
    super(props);
    this.api = new TextServices();
    this.state = this.emptyState();
  }

  emptyState = () => {
    return {
      textAnalyticsData: null,
      working: false
    };
  };

  getData = () => {
    this.api
      .service(TextAnalyticsVariables.GET_DATA)
      .then(res => {
        console.log(res);
        this.setState({
          textAnalyticsData: res.data.Sheet1
        });
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        // });
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
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
          <Col className="topContainer">
            <LineChart />
          </Col>
        </Col>
        <Col xl={6}>layout 2</Col>
      </Row>
    );
  }
}
