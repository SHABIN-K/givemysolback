import bs58 from "bs58";
import { Zap } from "lucide-react";
import React, { lazy, useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";

import solanaClient from "../../client/solana";
import DonationSection from "./DonationSection";
import ToggleInputSection from "./ToggleInputSection";
const SocialShareModal = lazy(() => import("./modal/SocialShareModal"));

const Transaction = ({ onProceed, isLoading, balanceLamports }) => {
  const BASIC_FEE_LAMPORTS = 10000;

  const [feePayerKey, setFeePayerKey] = useState("");
  const [rentAddress, setRentAddress] = useState("");
  const [donationPercent, setDonationPercent] = useState(15);

  const [errorMsg, setErrorMsg] = useState(null);
  const [showTwitterModal, setShowTwitterModal] = useState(false);
  const [config, setConfig] = useState({ gasPayment: balanceLamports < BASIC_FEE_LAMPORTS, rentCollection: false });

  const toggleConfig = key => {
    if (key === "gasPayment" && balanceLamports < BASIC_FEE_LAMPORTS) {
      alert("Gas Payment is Required because your wallet has insufficient SOL to cover the minimum transaction fee.");
      return;
    }
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShared = () => {
    localStorage.setItem("hasSharedOnTwitter", Date.now().toString());
    setDonationPercent(0);
    setShowTwitterModal(false);
  };

  const handleProceedTx = async () => {
    let keypair;

    if (config.rentCollection && !rentAddress) {
      setErrorMsg("Please enter a rent collection address.");
      return;
    }

    if (config.gasPayment && !feePayerKey) {
      setErrorMsg("Please enter the fee payer private key.");
      return;
    }

    if (config?.rentCollection) {
      try {
        new PublicKey(rentAddress);
      } catch {
        setErrorMsg("Oops! Invalid Solana address");
        setRentAddress("");
        return;
      }
    }

    if (config.gasPayment) {
      try {
        const secretKey = bs58.decode(feePayerKey);
        keypair = Keypair.fromSecretKey(secretKey);
        const balanceLamports = await solanaClient.getBalance(keypair.publicKey);

        if (balanceLamports < BASIC_FEE_LAMPORTS) {
          setFeePayerKey("");
          setErrorMsg(
            "The provided gas wallet has insufficient SOL to cover the minimum transaction fee. Please use a wallet with enough balance"
          );
          return;
        }
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
    <>
      <div className="mt-8">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Transaction Configuration</h3>
          <p className="text-sm text-gray-400 mb-4">
            Your connected wallet will be used by default for all Gas and payouts. You can change it if you like.
          </p>

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
            label="Payout Wallet"
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

          <DonationSection
            donationPercent={donationPercent}
            setDonationPercent={setDonationPercent}
            setShowTwitterModal={setShowTwitterModal}
          />
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

      <SocialShareModal isOpen={showTwitterModal} onClose={() => setShowTwitterModal(false)} onShared={handleShared} />
    </>
  );
};

export default Transaction;
