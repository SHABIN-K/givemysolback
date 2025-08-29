import React from "react";
import { Coins, Wallet, Shield, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: "Hidden SOL Recovery",
      description: "Find and reclaim SOL locked in thousands of unused token accounts you forgot about",
      gradient: "from-pink-500 to-purple-500",
      stat: "Average user finds 0.5-2 SOL",
    },
    {
      icon: Coins,
      title: "One-Click Cleanup",
      description: "Automatically close empty accounts and burn worthless tokens with a single transaction",
      gradient: "from-orange-500 to-yellow-500",
      stat: "Process 100+ accounts instantly",
    },
    {
      icon: Shield,
      title: "Safe & Transparent",
      description: "Open-source code, no private keys needed. You control every transaction",
      gradient: "from-blue-500 to-cyan-500",
      stat: "100% user-controlled",
    },
  ];

  return (
    <section className="pt-12 sm:pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm sm:text-base text-purple-300 font-medium">What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
            Your SOL is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              Hiding in Plain Sight
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            Every time you interact with a token on Solana, you pay rent to store account data. Most users have dozens of empty
            accounts still holding their SOL.We make it simple to reclaim that SOL by closing unused accounts and sending the rent
            back to your wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{feature.stat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
