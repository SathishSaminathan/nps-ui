import React from "react";
import "./button.scss";

const CustomButton = ({
  children,
  loading = false,
  disabled = false,
  onClick
}) => {
  return (
    <button
      className={`buttonStyle ${loading || disabled ? "disabled" : ""}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading && <div className="loader"></div>}
      {children}
    </button>
  );
};

export default CustomButton;
