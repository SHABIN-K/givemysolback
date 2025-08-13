import React from "react";
import { ExternalLink } from "lucide-react";

const TokenCard = ({ token, index, isSelected, onToggle }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
        isSelected ? "bg-red-500/10 border-red-500/30" : "bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/70"
      } ${index >= 6 ? "opacity-90 blur-[0.8px]" : ""}`}
      onClick={() => onToggle(index)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
          {token.logoURI ? (
            <img
              src={token.logoURI}
              alt={token.name}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/fallback-coin.png";
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
          )}
        </div>
        <div>
          <div className="text-white font-semibold">{token.name.slice(0, 15)}</div>
          <div className="text-gray-400 text-sm">{token.symbol}</div>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            window.open(`https://solscan.io/account/${token.mint}`, "_blank");
          }}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
