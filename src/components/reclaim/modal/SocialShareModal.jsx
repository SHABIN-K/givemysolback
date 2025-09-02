import { X } from "lucide-react";
import React, { useState } from "react";

const SocialShareModal = ({ isOpen, onClose, onShared, totalUSD }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleTwitterShare = () => {
    setIsSharing(true);

    const tweetOptions = [
      `Just used @givemysolback and got back $${totalUSD} worth of SOL 🤑 Free tool that actually puts money back in your wallet. #Solana #DeFi`,
      `Didn’t realize I had $$ stuck in rent fees… @givemysolback just returned $${totalUSD} of my SOL 🚀 Every degen should try this!`,
      `Closed old token accounts & instantly got $${totalUSD} back in SOL thanks to @givemysolback 🤯 Free money lying around in your wallet!`,
      `Crazy! @givemysolback found $${totalUSD} worth of SOL sitting in my wallet rent fees — now it’s back in my hands 💸`,
      `Just reclaimed $${totalUSD} worth of SOL from unused token accounts with @givemysolback. Free tool, instant gains 🚀`,
    ];

    const tweetText = tweetOptions[Math.floor(Math.random() * tweetOptions.length)];
    const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}`;

    window.open(tweetUrl, "_blank");
    setTimeout(() => {
      setIsSharing(false);
      onShared();
    }, 15000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-md">
        <button onClick={onClose} className="absolute right-2 top-2 p-2 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-2">Share on X</h4>
            <p className="text-gray-400 text-sm">
              Share our tool with your followers to unlock 0% fees and keep 100% of your recovered SOL!
            </p>
          </div>

          {/* Preview Tweet */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center" />
              <div className="flex-1">
                <div className="text-white text-sm mb-2">
                  Wow… closed unused Solana token accounts & got my $SOL rent fees back 🤯 Didn’t think it’d work but
                  @givemysolback proved me wrong. Every degen should try it! 🚀 #Solana #DeFi #TokenRecovery
                </div>
                <div className="text-gray-400 text-xs">Preview</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              data-umami-event="share-social-success"
              onClick={handleTwitterShare}
              disabled={isSharing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isSharing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Opening X...</span>
                </>
              ) : (
                <span>Share on X</span>
              )}
            </button>

            {!isSharing && (
              <button
                data-umami-event="share-social-cancel"
                onClick={onClose}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-6 rounded-xl transition-all duration-300"
              >
                Maybe Later
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
