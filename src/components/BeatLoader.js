import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = ({ color = "#ffffff" }) => {
  return (
    <div className="loading-spinner ">
      <BeatLoader color={color} loading={true} height={45} width={8} radius={2} margin={2} />
    </div>
  );
};

export default LoadingSpinner;
