import React from "react";

const CustomText = ({ children, style }) => {
  return (
    <div className="text" style={style}>
      {children}
    </div>
  );
};

export default CustomText;
