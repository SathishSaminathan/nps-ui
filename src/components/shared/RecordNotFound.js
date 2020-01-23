import React from "react";
import { Lotties } from "constants/AppConstants";
import LottieComponent from "./LottieComponent";

const RecordNotFound = ({ text = "No record Found" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <LottieComponent type={Lotties.RECORD_NOT_FOUND} width={250} />
    </div>
  );
};

export default RecordNotFound;
