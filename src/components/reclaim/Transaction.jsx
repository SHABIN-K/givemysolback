import { Zap } from "lucide-react";
import React, { useState } from "react";

import DonationSection from "./DonationSection";
import ToggleInputSection from "./ToggleInputSection";

const Transaction = ({ totalAmount = 12, onProceed, isLoading }) => {
  const [gasPayment, setGasPayment] = useState(false);
  const [rentCollection, setRentCollection] = useState(false);
  const [donationPercent, setDonationPercent] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [rentAddress, setRentAddress] = useState("");

  return (
    <div className="mt-8">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Transaction Configuration</h3>

        <ToggleInputSection
          label="Unified Gas Payment"
          isEnabled={gasPayment}
          onToggle={() => setGasPayment(!gasPayment)}
          inputValue={privateKey}
          onInputChange={e => setPrivateKey(e.target.value)}
          placeholder="Enter or paste private key"
          tooltipAction={"gasPayment"}
        />

        <ToggleInputSection
          label="Unified Rent Collection Address"
          isEnabled={rentCollection}
          onToggle={() => setRentCollection(!rentCollection)}
          inputValue={rentAddress}
          onInputChange={e => setRentAddress(e.target.value)}
          placeholder="Enter collection address"
          tooltipAction={"rentCollection"}
        />

        <DonationSection totalAmount={totalAmount} donationPercent={donationPercent} setDonationPercent={setDonationPercent} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onProceed}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          {isLoading ? (
            <span>Loading .....</span>
          ) : (
            <>
              <span className="hidden sm:inline">Execute Transaction</span>
              <span className="sm:hidden">Execute</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Transaction;
