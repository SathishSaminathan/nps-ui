import React from "react";
import "./count.scss";
import { Row, Col } from "antd";

const DashboardCountComponent = ({ count, name, index }) => {
  const renderStyle = index => {
    // switch (index) {
    //   case 1:
    //     return { "--child1": count };
    //   case 2:
    //     return { "--child2": count };
    //   case 3:
    //     return { "--child3": count };
    //   case 4:
    //     return { "--child4": count };

    //   default:
    //     break;
    // }
    return { [`--child${index}`]: count };
  };
  return (
    <div className="countContainer" style={renderStyle(index)}>
      <div className="innerContainer">
        <div className="count">
          <div className={`name ${name}`}>{name}</div>
        </div>
        <div className="circleArea">
          <svg className="svg">
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className={`value  ${name} perc`}>
            <span>
              {count}
              <span className="symbol">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCountComponent;
