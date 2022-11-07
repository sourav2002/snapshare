import React from "react";
import { Vortex } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />

      {/* dynamic message passed with spinner */}
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
