import React from "react";
import { AlertCircle, Flame } from "lucide-react";
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
    default:
      return {};
  }
};

const TokenSection = ({ type, tokens, tokensCount, selectedTokens, onToggleSelection }) => {
  const config = getConfig(type);
  const Icon = config.icon;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${config.iconColor}`} />
          {config.title} ({tokensCount})
        </h3>
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
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSection;
