import React from "react";
import { ClipLoader, DotLoader } from "react-spinners";
import { Colors } from "constants/themeConstants";

const Loader = ({ size = 40 }) => {
  return (
    <div className="loaderContainer">
      <DotLoader
        size={size}
        //size={"150px"} this also works
        color={Colors.blue}
        loading
      />
    </div>
  );
};

export default Loader;
