import React from "react";

const InfoBanner = ({ title, description }) => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <div>
          <h4 className="text-blue-300 font-semibold mb-1">{title}</h4>
          <p className="text-blue-200 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
