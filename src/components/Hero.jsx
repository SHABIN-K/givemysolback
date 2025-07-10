import React from "react";
import { TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center mb-16 py-12">
      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-full mb-8">
        <TrendingUp className="w-4 h-4 mr-2 text-pink-400" />
        <span>Recover Lost Solana Tokens</span>
      </div>

      <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight text-white">
        givemy
        <span className="gradient-text">SOL</span>
        back
      </h1>

      <p className="text-xl sm:text-2xl font-medium mb-4 max-w-3xl mx-auto leading-relaxed text-gray-300">
        Yo, forgot some SOL in random wallets? Let's get it back 🕵️
      </p>

      <p className="text-lg max-w-2xl mx-auto text-gray-400">
        Scan your old Solana wallets and discover forgotten tokens worth real
        money. No signup required, completely free to use.
      </p>
    </section>
  );
};

export default Hero;
