import React from "react";
import { Gift } from "lucide-react";
import { trackEvent } from "../../utils";

const DONATION_CONFIG = {
  0: {
    gradient: "from-gray-500/10 to-gray-600/10",
    borderColor: "border-gray-500/20",
    textColor: "text-gray-300",
    bgColor: "bg-gray-500/10",
    title: "You'll receive 100%",
    subtitle: "Free Forever 🎉",
    description: "Enjoy our service at no cost — we’re just glad you’re here 🙏",
    requiresShare: true,
  },
  7: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-300",
    bgColor: "bg-blue-500/10",
    title: "You'll receive 93%",
    subtitle: "Power Boost 🔋",
    description: "You’re joining others who help keep this project alive 💡",
  },
  15: {
    gradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20",
    textColor: "text-green-300",
    bgColor: "bg-green-500/10",
    title: "You'll receive 85%",
    subtitle: "Community Favorite 💚",
    description: "The perfect balance of support & savings 🌿",
  },
  30: {
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-300",
    bgColor: "bg-purple-500/10",
    title: "You'll receive 70%",
    subtitle: "Generous Hero ❤️",
    description: "Your generosity fuels growth & new features 🔥",
  },
};

const SHARE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function hasValidShare() {
  const stored = localStorage.getItem("hasSharedOnTwitter");
  if (!stored) return false;

  const lastShare = parseInt(stored, 10);
  if (isNaN(lastShare)) return false;

  return Date.now() - lastShare < SHARE_EXPIRY_MS;
}

const DonationSection = ({ donationPercent, setDonationPercent, setShowTwitterModal }) => {
  const donationOptions = [0, 7, 15, 30];
  const currentConfig = DONATION_CONFIG[donationPercent];

  const canUseZero = () => hasValidShare();

  const handleDonationChange = percent => {
    if (percent === 0 && !canUseZero()) {
      trackEvent("share-social-start");
      setShowTwitterModal(true);
      return;
    }
    setDonationPercent(percent);
  };

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
            onClick={() => handleDonationChange(percent)}
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
