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

const card = [
  {
    name: "Total NPS values",
    value: 100
  },
  {
    name: "Promoters",
    value: 80
  },
  {
    name: "Passives",
    value: 60
  },
  {
    name: "Detractors",
    value: 40
  }
];

const DashboardComponent = () => {
  const renderCardComponents = () => {
    return card.map((data, i) => (
      <DashboardCountComponent
        name={data.name}
        count={data.value}
        index={i + 1}
        key={i}
      />
    ));
  };
  return (
    <Row style={{ padding: 24 }}>
      <Col xl={24}>
        <Col xl={14}>
          <Col xl={24}>{renderCardComponents()}</Col>
        </Col>
        <Col xl={10}>
          <Doughnut
            data={data}
            options={{
              plugins: {
                datalabels: {
                  // display: true,
                  align: "center",
                  anchor: "center",
                  color: "#000",
                  font: {
                    size: 15
                  },
                  formatter: (value, ctx) => {
                    // let sum = 0;
                    // let dataArr = ctx.chart.data.datasets[0].data;
                    // dataArr.map(data => {
                    //   sum += data;
                    // });
                    // let percentage = ((value * 100) / sum).toFixed(2) + "%";
                    return `${value}%`;
                  }
                }
              }
            }}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default DashboardComponent;
