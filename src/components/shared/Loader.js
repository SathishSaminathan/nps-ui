import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size = 40 }) => {
  return (
    <div className="loaderContainer">
      <ClipLoader
        size={size}
        //size={"150px"} this also works
        color={"blue"}
        loading
      />
    </div>
  );
};

export default Loader;
