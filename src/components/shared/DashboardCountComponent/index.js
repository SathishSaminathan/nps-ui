import React from "react";
import "./count.scss";
import { Row, Col } from "antd";

const DashboardCountComponent = ({ count, name }) => {
  return (
    <div className="countContainer">
      <div className="count">
        <span className="label">{name}</span>
        <div className={`value  ${name}`}>
          <span>{count}<span className="symbol">%</span></span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCountComponent;
