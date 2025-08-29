import React from "react";

const EmptyState = ({ icon: Icon, title, description, iconColor = "text-gray-400" }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-5 sm:p-8 text-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
      </div>
      <h4 className="text-lg sm:text-xl font-bold text-gray-300 mb-1.5 sm:mb-2">{title}</h4>
      <p className="text-gray-500 text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default EmptyState;
