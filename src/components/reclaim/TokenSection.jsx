import React from "react";
import { AlertCircle, Flame, Shield } from "lucide-react";
import TokenCard from "./TokenCard";

const getConfig = type => {
  switch (type) {
    case "burn":
      return {
        title: "Select Tokens to Burn",
        icon: Flame,
        iconColor: "text-red-400",
        selectColor: "text-red-400 hover:text-red-300",
        warningBg: "bg-red-500/10 border-red-500/20",
        warningIcon: "text-red-400",
        warningTitle: "text-red-300",
        warningText: "text-red-200",
        warningContent: {
          title: "Caution Required",
          text: "These tokens have low value but are worth more than $1. Burning them will permanently destroy the tokens and reclaim rent.",
        },
      };
    case "verified":
      return {
        title: "Verified Tokens",
        icon: Shield,
        iconColor: "text-blue-400",
        selectColor: "text-blue-400 hover:text-blue-300",
        warningBg: "bg-yellow-500/10 border-yellow-500/20",
        warningIcon: "text-yellow-400",
        warningTitle: "text-yellow-300",
        warningText: "text-yellow-200",
        warningContent: {
          title: "High Value Warning",
          text: "These are verified tokens with significant value. Double-check before closing these accounts.",
        },
      };
    default:
      return {};
  }
};

const TokenSection = ({ type, tokens, selectedTokens, onToggleSelection, onSelectAll }) => {
  const config = getConfig(type);
  const Icon = config.icon;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${config.iconColor}`} />
          {config.title} ({tokens.length})
        </h3>
        <button onClick={onSelectAll} className={`${config.selectColor} text-sm font-medium`}>
          {selectedTokens.size === tokens.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className={`${config.warningBg} rounded-xl p-4 mb-6`}>
        <div className="flex items-start space-x-3">
          <AlertCircle className={`w-5 h-5 ${config.warningIcon} mt-0.5 flex-shrink-0`} />
          <div>
            <h4 className={`${config.warningTitle} font-semibold mb-1`}>{config.warningContent.title}</h4>
            <p className={`${config.warningText} text-sm`}>{config.warningContent.text}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tokens.map((token, index) => (
          <TokenCard
            key={index}
            token={token}
            index={index}
            isSelected={selectedTokens.has(index)}
            onToggle={onToggleSelection}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default TokenSection;
