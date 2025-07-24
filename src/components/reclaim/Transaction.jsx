import React, { useState } from "react";
import { HelpCircle, Zap, Gift, ArrowRight } from "lucide-react";

const Transaction = ({ onProceed }) => {
  const [gasPayment, setGasPayment] = useState(true);
  const [rentCollection, setRentCollection] = useState(true);
  const [donationPercent, setDonationPercent] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [rentAddress, setRentAddress] = useState("");
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  const formatNumber = num => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(num);
  };

  const donationOptions = [0, 5, 50, 100];

  const calculateDonation = () => {
    // return (summary.totalRent * donationPercent) / 100;
    return 12 / 100;
  };

  const calculateNetAmount = () => {
    // return summary.totalRent - calculateDonation();
    return 12 - calculateDonation();
  };

  const tooltips = {
    gasPayment:
      "Use a single wallet to pay for all transaction fees. This simplifies the process and ensures all transactions can be completed.",
    rentCollection:
      "Specify where all reclaimed SOL rent should be sent. All closed accounts will send their rent to this address.",
  };

  const Tooltip = ({ content, children }) => (
    <div className="relative inline-block">
      {children}
      {hoveredTooltip === content && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg border border-gray-700 whitespace-nowrap z-50">
          <div className="max-w-xs whitespace-normal">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-8">
      {/* Settings Form */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Transaction Configuration</h3>

        {/* Unified Gas Payment */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  gasPayment ? "bg-blue-500" : "bg-gray-600"
                } relative cursor-pointer`}
                onClick={() => setGasPayment(!gasPayment)}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    gasPayment ? "translate-x-6" : "translate-x-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">Unified Gas Payment</span>
              <Tooltip content={tooltips.gasPayment}>
                <HelpCircle
                  className="w-4 h-4 text-gray-400 cursor-help"
                  onMouseEnter={() => setHoveredTooltip(tooltips.gasPayment)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                />
              </Tooltip>
            </div>
          </div>
          {gasPayment && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="text"
                value={privateKey}
                onChange={e => setPrivateKey(e.target.value)}
                placeholder="Enter or paste private key"
                className="flex-1 px-3 sm:px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
          )}
        </div>

        {/* Unified Rent Collection Address */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  rentCollection ? "bg-blue-500" : "bg-gray-600"
                } relative cursor-pointer`}
                onClick={() => setRentCollection(!rentCollection)}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    rentCollection ? "translate-x-6" : "translate-x-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">Unified Rent Collection Address</span>
              <Tooltip content={tooltips.rentCollection}>
                <HelpCircle
                  className="w-4 h-4 text-gray-400 cursor-help"
                  onMouseEnter={() => setHoveredTooltip(tooltips.rentCollection)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                />
              </Tooltip>
            </div>
          </div>
          {rentCollection && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="text"
                value={rentAddress}
                onChange={e => setRentAddress(e.target.value)}
                placeholder="Enter collection address"
                className="flex-1 px-3 sm:px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
          )}
        </div>

        {/* Donation Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Gift className="w-5 h-5 text-pink-400" />
            <h4 className="text-white font-semibold text-sm sm:text-base">Support Development (Optional)</h4>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            Help us maintain and improve this free service. Your donation supports continued development.
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
            {donationOptions.map(percent => (
              <button
                key={percent}
                onClick={() => setDonationPercent(percent)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                  donationPercent === percent
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
          {donationPercent > 0 && (
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-pink-300">Donation ({donationPercent}%):</span>
                <span className="text-pink-400 font-semibold">{formatNumber(calculateDonation())} SOL</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-white">You'll receive:</span>
                <span className="text-green-400 font-semibold">{formatNumber(calculateNetAmount())} SOL</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onProceed}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Execute Transaction</span>
          <span className="sm:hidden">Execute</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Transaction;
