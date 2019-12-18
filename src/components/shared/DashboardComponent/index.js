import React from "react";
import { Row, Col } from "antd";
import { Doughnut } from "react-chartjs-2";

import DashboardCountComponent from "components/shared/DashboardCountComponent";

const data = {
  labels: ["PROMOTERS", "PASSIVES", "DETRACTORS"],
  datasets: [
    {
      data: [20, 50, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const DashboardComponent = () => {
  return (
    <Row>
      <Col xl={24}>
        <Col xl={12}>
          <Col xl={12}>
            <DashboardCountComponent name="Total NPS values" count={100} />
          </Col>
          <Col xl={12}>
            <DashboardCountComponent name="Promoters" count={20} />
          </Col>
          <Col xl={12}>
            <DashboardCountComponent name="Passives" count={50} />
          </Col>
          <Col xl={12}>
            <DashboardCountComponent name="Detractors" count={30} />
          </Col>
        </Col>
        <Col xl={12}>
          <Doughnut data={data} />
        </Col>
      </Col>
    </Row>
  );
};

export default DashboardComponent;
