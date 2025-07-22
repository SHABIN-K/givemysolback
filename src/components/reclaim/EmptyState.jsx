import React from "react";

const EmptyState = ({ icon: Icon, title, description, iconColor = "text-gray-400" }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h4 className="text-xl font-bold text-gray-300 mb-2">{title}</h4>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
