import React from "react";
import { Flame, LogOut, Zap } from "lucide-react";
import useWalletManager from "../../hooks/useWalletManager";

const TabNavigation = ({ activeTab, setActiveTab, accOverview }) => {
  const { disconnect } = useWalletManager();
  
  const tabs = [
    { id: "tokens", label: "Burn", count: accOverview.burnTokenAccCount, icon: Flame, tone: "red" },
    { id: "zero-balance", label: "Zero Balance", count: accOverview.zeroBalanceAccCount, icon: Zap, tone: "green" },
  ];

  const toneToActive = {
    red: {
      container: "bg-red-500/20 border border-red-500/30 text-red-300",
      badge: "bg-red-500/30",
    },
    green: {
      container: "bg-green-500/20 border border-green-500/30 text-green-300",
      badge: "bg-green-500/30",
    },
  };

  const baseInactive = "bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white";

  return (
    <div className="flex flex-wrap-reverse gap-2 sm:gap-3 mb-4 sm:mb-6">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const activeStyles = toneToActive[tab.tone];
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium transition-all text-sm sm:text-base ${
              isActive ? activeStyles.container : baseInactive
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{tab.label}</span>
            <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${isActive ? activeStyles.badge : "bg-gray-700"}`}>
              {tab.count}
            </span>
          </button>
        );
      })}

      <button
        onClick={disconnect}
        className="ml-auto flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300"
      >
        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Disconnect Wallet</span>
        <span className="sm:hidden">Disconnect</span>
      </button>
    </div>
  );
};

export default TabNavigation;
