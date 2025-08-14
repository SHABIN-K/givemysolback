import React from "react";
import { X } from "lucide-react";

const TokenCard = ({ token, handleRemoveToken }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl transition-all bg-gray-900/50 border-gray-700/30 hover:bg-gray-900/7">
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
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          handleRemoveToken(token.mint);
        }}
        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TokenCard;
