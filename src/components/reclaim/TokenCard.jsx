import React from "react";
import { ExternalLink, CheckCircle2, Flame, Shield } from "lucide-react";
import { formatNumber } from "../../utils";

const getTypeConfig = (type, isSelected) => {
  switch (type) {
    case "burn":
      return {
        bgColor: isSelected ? "bg-red-500/10 border-red-500/30" : "bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/70",
        checkboxColor: isSelected ? "bg-red-500 border-red-500" : "border-gray-600",
        icon: Flame,
        iconBg: "from-red-600 to-orange-500",
        valueColor: "text-red-400",
        rentColor: "text-green-400",
      };
    case "verified":
      return {
        bgColor: isSelected ? "bg-blue-500/10 border-blue-500/30" : "bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/70",
        checkboxColor: isSelected ? "bg-blue-500 border-blue-500" : "border-gray-600",
        icon: Shield,
        iconBg: "from-blue-600 to-purple-500",
        valueColor: "text-blue-400",
        rentColor: "text-green-400",
      };
    default:
      return {
        bgColor: isSelected ? "bg-green-500/10 border-green-500/30" : "bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/70",
        checkboxColor: isSelected ? "bg-green-500 border-green-500" : "border-gray-600",
        icon: CheckCircle2,
        iconBg: "from-gray-600 to-gray-500",
        valueColor: "text-green-400",
        rentColor: "text-green-400",
      };
  }
};

const TokenCard = ({ token, index, isSelected, onToggle, type }) => {
  const config = getTypeConfig(type, isSelected);
  const Icon = config.icon;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-xl transition-all cursor-pointer ${config.bgColor}`}
      onClick={() => onToggle(index)}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
        {/* <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${config.checkboxColor}`}>
          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div> */}

        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${config.iconBg} rounded-full flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div>
          <div className="text-white font-semibold text-sm sm:text-base flex items-center">{token.tokenName}</div>
          <div
            className={`text-xs sm:text-sm ${
              type === "burn" ? "text-red-400" : type === "verified" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            {token.symbol}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
        <div className="text-left sm:text-right">
          {token.value && (
            <div className={`${config.valueColor} font-semibold text-sm sm:text-base`}>${formatNumber(token.value, 2)}</div>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={e => {
              e.stopPropagation();
              window.open(`https://solscan.io/account/${token.address}`, "_blank");
            }}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
