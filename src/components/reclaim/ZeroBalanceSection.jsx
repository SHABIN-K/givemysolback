import React from "react";
import { Zap } from "lucide-react";

import EmptyState from "./EmptyState";
import { formatNumber } from "../../utils";

const ZeroBalanceSection = ({ count, totalRent }) => {
  return (
    <div>
      {count != 0 && (
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
            Zero Balance Accounts ({count})
          </h3>
        </div>
      )}

      {count === 0 ? (
        <EmptyState
          icon={Zap}
          title="No Zero Balance Accounts"
          description="All your token accounts currently have balances. No empty accounts found to close."
        />
      ) : (
        <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-4 sm:p-6 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{count} Empty Accounts Found</h4>
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm">These accounts are empty and ready to be closed</p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-400">+{formatNumber(totalRent)} SOL</div>
            <div className="text-xs sm:text-sm text-green-300">Total Rent to Reclaim</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZeroBalanceSection;
