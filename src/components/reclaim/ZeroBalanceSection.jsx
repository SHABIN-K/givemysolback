import React from "react";
import { Zap } from "lucide-react";

import EmptyState from "./EmptyState";
import { formatNumber } from "../../utils";

const ZeroBalanceSection = ({ count, totalRent }) => {
  return (
    <div>
      {count != 0 && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-400" />
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
        <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">{count} Empty Accounts Found</h4>
          <p className="text-gray-400 mb-4">These accounts are empty and ready to be closed</p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">+{formatNumber(totalRent)} SOL</div>
            <div className="text-sm text-green-300">Total Rent to Reclaim</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZeroBalanceSection;
