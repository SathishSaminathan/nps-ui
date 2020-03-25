import React from "react";

const DescTitle = ({ children, style={} }) => {
  return (
    <div className="descTitle" style={style}>
      {children}
    </div>
  );
};

export default DescTitle;
