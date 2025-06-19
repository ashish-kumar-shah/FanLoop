import React from "react";

const UploadProgres = ({ progress }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-white z-50">
      <div className="w-full bg-gray-200 h-3">
        <div
          className="bg-green-500 h-3 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-sm py-1">{progress}% uploaded</p>
    </div>
  );
};

export default UploadProgres;
