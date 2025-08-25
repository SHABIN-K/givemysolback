import React from "react";
import { Gift } from "lucide-react";
import { formatNumber } from "../../utils";

const DONATION_CONFIG = {
  0: {
    gradient: "from-gray-500/10 to-gray-600/10",
    borderColor: "border-gray-500/20",
    textColor: "text-gray-300",
    bgColor: "bg-gray-500/10",
    title: "You'll receive 100%",
    subtitle: "Every SOL goes to you!",
    description: "We appreciate you using our free service! 🙏",
    requiresShare: true,
  },
  5: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-300",
    bgColor: "bg-blue-500/10",
    title: "You'll receive 95%",
    subtitle: "You're awesome!",
    description: "Small tip, big impact! Helps us keep the lights on ⚡",
  },
  50: {
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-300",
    bgColor: "bg-purple-500/10",
    title: "You'll receive 50%",
    subtitle: "You're incredible!",
    description: "Generous soul! You're helping us build amazing features 🔥",
  },
  100: {
    gradient: "from-yellow-500/10 to-orange-500/10",
    borderColor: "border-yellow-500/20",
    textColor: "text-yellow-300",
    bgColor: "bg-yellow-500/10",
    title: "You're donating everything!",
    subtitle: "LEGEND STATUS!",
    description: "Ultimate chad move! You're a true community hero! 👑",
  },
};

const DonationSection = ({ donationPercent, setDonationPercent }) => {
  const donationOptions = [0, 5, 50, 100];
  const currentConfig = DONATION_CONFIG[donationPercent];

  return (
    <>
      <div className="flex items-center space-x-3 mb-2">
        <Gift className="w-5 h-5 text-pink-400" />
        <h4 className="text-white font-semibold text-sm sm:text-base">Keep this service free & growing 🚀</h4>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm mb-4">
        Even a small donation helps us improve features and keep access free for everyone.
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

      {currentConfig && (
        <div
          className={`text-center p-3 bg-gradient-to-r ${currentConfig.gradient} border ${currentConfig.borderColor} rounded-lg`}
        >
          <p className={`${currentConfig.textColor} text-sm`}>
            💯 <strong>{currentConfig.title}</strong> - {currentConfig.subtitle}
          </p>
          <p className={`${currentConfig.textColor.replace("300", "200")} text-xs mt-1`}>{currentConfig.description}</p>
        </div>
      )}
    </>
  );
};

export default DonationSection;
