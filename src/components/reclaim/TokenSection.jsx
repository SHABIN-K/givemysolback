import React from "react";
import { AlertCircle, Flame, Shield } from "lucide-react";
import TokenCard from "./TokenCard";
import EmptyState from "./EmptyState";

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
        emptyTitle: "No Tokens to Burn",
        emptyText: "Great! No low-value or scam tokens found in your portfolio. All your tokens appear to have good value.",
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
        emptyTitle: "No Verified Tokens",
        emptyText: "No verified high-value tokens found in your portfolio that can be managed from here.",
      };
    default:
      return {};
  }
};

const TokenSection = ({ type, tokens, tokensCount, selectedTokens, onToggleSelection, onSelectAll }) => {
  const config = getConfig(type);
  const Icon = config.icon;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${config.iconColor}`} />
          {config.title} ({tokensCount})
        </h3>
        {tokensCount != 0 && (
          <button onClick={onSelectAll} className={`${config.selectColor} text-sm font-medium`}>
            {selectedTokens.size === tokens.length ? "Deselect All" : "Select All"}
          </button>
        )}
      </div>

      {tokensCount === 0 && <EmptyState icon={Icon} title={config.emptyTitle} description={config.emptyText} />}
      {tokensCount != 0 && (
        <>
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

            {type === "burn" && tokensCount > tokens.length && (
              <div className="col-span-full mt-4 p-4 bg-gray-900/50 border border-gray-700/30 rounded-xl text-center">
                <p className="text-gray-400 text-sm">
                  Showing top {tokens.length} most valuable tokens out of {tokensCount} total.
                  <br />
                  <span className="text-gray-500">
                    Remaining {tokensCount - tokens.length} tokens are included in calculations when selected.
                  </span>
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSection;
