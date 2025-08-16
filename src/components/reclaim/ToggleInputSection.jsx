import React, { useState } from "react";
import { HelpCircle } from "lucide-react";

const Tooltip = ({ content, hoveredTooltip, children }) => (
  <div className="relative inline-block">
    {children}
    {hoveredTooltip === content && (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg border border-gray-700 whitespace-nowrap z-50">
        <div className="max-w-xs whitespace-normal">{content}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    )}
  </div>
);

const ToggleInputSection = ({ label, isEnabled, onToggle, inputValue, onInputChange, placeholder, tooltipAction }) => {
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  const tooltips = {
    gasPayment:
      "Use a single wallet to pay for all transaction fees. This simplifies the process and ensures all transactions can be completed.",
    rentCollection:
      "Specify where all reclaimed SOL rent should be sent. All closed accounts will send their rent to this address.",
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div  className={`w-12 h-6 rounded-full transition-colors ${isEnabled ? "bg-blue-500" : "bg-gray-600"} relative cursor-pointer`} onClick={onToggle}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isEnabled ? "translate-x-6" : "translate-x-0.5"}`}/>
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">{label}</span>
          <Tooltip content={tooltips[tooltipAction]} hoveredTooltip={hoveredTooltip}>
            <HelpCircle
              className="w-4 h-4 text-gray-400 cursor-help"
              onMouseEnter={() => setHoveredTooltip(tooltips[tooltipAction])}
              onMouseLeave={() => setHoveredTooltip(null)}
            />
          </Tooltip>
        </div>
      </div>
      {isEnabled && (
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        />
      )}
    </div>
  );
};

export default ToggleInputSection;
