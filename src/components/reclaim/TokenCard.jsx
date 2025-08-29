import React from "react";
import { X } from "lucide-react";

const TokenCard = ({ token, handleRemoveToken }) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/7">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
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
            <span className="text-white font-bold text-xs sm:text-sm">{token.symbol.slice(0, 2)}</span>
          )}
        </div>
        <div>
          <div className="text-white font-semibold text-sm sm:text-base">{token.name.slice(0, 15)}</div>
          <div className="text-gray-400 text-xs sm:text-sm">{token.symbol}</div>
        </div>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          handleRemoveToken(token.mint);
        }}
        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default TokenCard;
