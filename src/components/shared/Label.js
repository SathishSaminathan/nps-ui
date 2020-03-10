import React from "react";

const Label = ({ children, className, style, color = "black" }) => {
  return (
    <span
      className={`${className} labelStyle`}
      style={{ color: color, ...style }}
    >
      {children}
    </span>
  );
};

export default Label;
