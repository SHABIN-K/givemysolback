import bs58 from "bs58";
import { Zap } from "lucide-react";
import React, { useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";

import DonationSection from "./DonationSection";
import ToggleInputSection from "./ToggleInputSection";

const Transaction = ({ onProceed, isLoading }) => {
  const [feePayerKey, setFeePayerKey] = useState("");
  const [rentAddress, setRentAddress] = useState("");
  const [donationPercent, setDonationPercent] = useState(5);

  const [errorMsg, setErrorMsg] = useState(null);
  const [config, setConfig] = useState({ gasPayment: false, rentCollection: false });

  const toggleConfig = key => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProceedTx = () => {
    let keypair;

    if (config.rentCollection) {
      try {
        new PublicKey(rentAddress);
      } catch {
        setErrorMsg("Oops! Invalid Solana address");
        setRentAddress("");
        return;
      }
    }

    if (config.gasPayment && feePayerKey) {
      try {
        const secretKey = bs58.decode(feePayerKey);
        keypair = Keypair.fromSecretKey(secretKey);
      } catch {
        setErrorMsg("Oops! Invalid fee payer secret");
        setFeePayerKey("");
        return;
      }
    }

    onProceed({
      feePayerKey: config.gasPayment ? keypair || undefined : null,
      rentReceiver: config.rentCollection ? rentAddress || undefined : null,
      commissionPercent: donationPercent,
    });

    setFeePayerKey("");
    setRentAddress("");
    setErrorMsg("");
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Transaction Configuration</h3>
        <ToggleInputSection
          label="Unified Gas Payment"
          isEnabled={config.gasPayment}
          onToggle={() => toggleConfig("gasPayment")}
          inputValue={feePayerKey}
          onInputChange={e => setFeePayerKey(e.target.value)}
          placeholder="Enter or paste private key"
          tooltipAction={"gasPayment"}
        />

        <ToggleInputSection
          label="Unified Rent Collection Address"
          isEnabled={config.rentCollection}
          onToggle={() => toggleConfig("rentCollection")}
          inputValue={rentAddress}
          onInputChange={e => setRentAddress(e.target.value)}
          placeholder="Enter collection address"
          tooltipAction={"rentCollection"}
        />

        {errorMsg && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm px-3 py-2"
          >
            {errorMsg}
          </div>
        )}

        <DonationSection donationPercent={donationPercent} setDonationPercent={setDonationPercent} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleProceedTx}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          {isLoading ? <span>Loading .....</span> : <span>Sign & Send</span>}
        </button>
      </div>
    </div>
  );
};

export default Transaction;
