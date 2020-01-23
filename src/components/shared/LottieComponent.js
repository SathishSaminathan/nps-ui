import React from "react";
import Lottie from "react-lottie";

import { Lotties } from "constants/AppConstants";
import LottieFile from "assets/lottiefiles";

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const getAnimationType = type => {
  let lottie = null;
  switch (type) {
    case Lotties.VENDOR_PERSON:
      lottie = LottieFile.VendorImage;
      break;
    case Lotties.RECORD_NOT_FOUND:
      lottie = LottieFile.RecordNotFound;
      break;
    default:
      lottie = LottieFile.RecordNotFound;
      break;
  }
  return lottie;
};

const LottieComponent = ({ width = 190, height = 250, type }) => {
  return (
    <Lottie
      options={{ ...defaultOptions, animationData: getAnimationType(type) }}
      width={width}
      height={height}
    />
  );
};

export default LottieComponent;
