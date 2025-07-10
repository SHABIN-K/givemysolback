import React from "react";
import { Coins, Shield, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="py-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                🕵️ Token Detective
              </h1>
              <p className="text-sm text-gray-400">For the degens</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
