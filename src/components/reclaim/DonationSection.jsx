import React from "react";
import { Gift } from "lucide-react";
import { formatNumber } from "../../utils";

const DonationSection = ({ totalAmount, donationPercent, setDonationPercent }) => {
  const donationOptions = [0, 5, 50, 100];
  const donation = totalAmount * (donationPercent / 100);
  const net = totalAmount - donation;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Gift className="w-5 h-5 text-pink-400" />
        <h4 className="text-white font-semibold text-sm sm:text-base">Support Development</h4>
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
          <div className="flex justify-between text-sm">
            <span className="text-pink-300">Donation ({donationPercent}%):</span>
            <span className="text-pink-400 font-semibold">{formatNumber(donation)} SOL</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-white">You'll receive:</span>
            <span className="text-green-400 font-semibold">{formatNumber(net)} SOL</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationSection;
