import React from "react";

const Loading = ({ placeholder }) => {
  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 h-44 lg:h-80 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="loading-spinner"></div>
          <span className="text-gray-300">{placeholder}</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
