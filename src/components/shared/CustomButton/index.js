import React from "react";
import "./button.scss";

const CustomButton = ({ children, loading = false, disabled=false }) => {
  return (
    <button
      className={`buttonStyle ${loading || disabled ? "disabled" : ""}`}
      disabled={loading}
    >
      {loading && <div className="loader"></div>}
      {children}
    </button>
  );
};

export default CustomButton;
