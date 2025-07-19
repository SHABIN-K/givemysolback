import React, { useState } from "react";
import { TrendingUp, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import components
import PortfolioStats from "../components/reclaim/PortfolioStats";
import TabNavigation from "../components/reclaim/TabNavigation";
import ZeroBalanceSection from "../components/reclaim/ZeroBalanceSection";
import TokenSection from "../components/reclaim/TokenSection";
import TransactionSummary from "../components/reclaim/TransactionSummary";

const ReclaimPage = () => {
  const [selectedBurnTokens, setSelectedBurnTokens] = useState(new Set());
  const [selectedVerifiedTokens, setSelectedVerifiedTokens] = useState(new Set());
  const [activeTab, setActiveTab] = useState("tokens");

  // Mock data - filter tokens worth more than $1
  const zeroBalanceAccounts = [
    {
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      tokenName: "BONK",
      rentAmount: 0.00203928,
      status: "Zero Balance",
      canClose: true,
    },
    {
      address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
      tokenName: "WIF",
      rentAmount: 0.00203928,
      status: "Zero Balance",
      canClose: true,
    },
    {
      address: "BxnUDmKjYkKAyhwQFQCLbGqzMpKbzRjkJSzXPTbYqKjR",
      tokenName: "PEPE",
      rentAmount: 0.00203928,
      status: "Zero Balance",
      canClose: true,
    },
    {
      address: "FkjXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB789",
      tokenName: "USDC",
      rentAmount: 0.00203928,
      status: "Zero Balance",
      canClose: true,
    },
  ];

  // Only show tokens worth more than $1
  const burnCandidateTokens = [
    {
      address: "GhiQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcAB",
      tokenName: "SCAM Token",
      symbol: "STK",
      balance: "1,000,000",
      value: 2.5, // More than $1
      rentAmount: 0.00203928,
      reason: "Worthless/Scam Token",
      warning: "Token value is low but above $1",
    },
    {
      address: "JklMNO8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB456",
      tokenName: "Dead Project",
      symbol: "DPJ",
      balance: "500",
      value: 1.25, // More than $1
      rentAmount: 0.00203928,
      reason: "Project Abandoned",
      warning: "No trading activity for months",
    },
  ];

  const verifiedTokens = [
    {
      address: "So11111111111111111111111111111111111111112",
      tokenName: "Wrapped SOL",
      symbol: "SOL",
      balance: "2.5",
      value: 500.0,
      rentAmount: 0.00203928,
      verified: true,
      warning: "High value token - confirm before closing",
    },
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      tokenName: "USD Coin",
      symbol: "USDC",
      balance: "150.00",
      value: 150.0,
      rentAmount: 0.00203928,
      verified: true,
      warning: "Stable coin with real value",
    },
    {
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      tokenName: "Bonk",
      symbol: "BONK",
      balance: "1,000,000",
      value: 25.5,
      rentAmount: 0.00203928,
      verified: true,
      warning: "Popular meme coin with value",
    },
  ];

  const handleSelectAll = type => {
    if (type === "burn") {
      if (selectedBurnTokens.size === burnCandidateTokens.length) {
        setSelectedBurnTokens(new Set());
      } else {
        setSelectedBurnTokens(new Set(burnCandidateTokens.map((_, i) => i)));
      }
    } else if (type === "verified") {
      if (selectedVerifiedTokens.size === verifiedTokens.length) {
        setSelectedVerifiedTokens(new Set());
      } else {
        setSelectedVerifiedTokens(new Set(verifiedTokens.map((_, i) => i)));
      }
    }
  };

  const toggleSelection = (type, index) => {
    if (type === "burn") {
      const newSet = new Set(selectedBurnTokens);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      setSelectedBurnTokens(newSet);
    } else if (type === "verified") {
      const newSet = new Set(selectedVerifiedTokens);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      setSelectedVerifiedTokens(newSet);
    }
  };

  const getSelectedCounts = () => {
    const burnCount = selectedBurnTokens.size;
    const verifiedCount = selectedVerifiedTokens.size;
    const totalSelected = burnCount + verifiedCount;

    const burnRent = Array.from(selectedBurnTokens).reduce((sum, i) => sum + burnCandidateTokens[i].rentAmount, 0);
    const verifiedRent = Array.from(selectedVerifiedTokens).reduce((sum, i) => sum + verifiedTokens[i].rentAmount, 0);
    const zeroBalanceRent = zeroBalanceAccounts.reduce((sum, acc) => sum + acc.rentAmount, 0);
    const totalRent = burnRent + verifiedRent + zeroBalanceRent;

    return {
      totalSelected,
      totalRent,
      zeroCount: zeroBalanceAccounts.length,
      burnCount,
      verifiedCount,
    };
  };

  const { totalSelected, totalRent, zeroCount, burnCount, verifiedCount } = getSelectedCounts();

  const formatNumber = num => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(num);
  };

  // Calculate stats
  const stats = {
    burnCandidatesCount: burnCandidateTokens.length,
    verifiedTokensCount: verifiedTokens.length,
    zeroBalanceCount: zeroBalanceAccounts.length,
  };

  const tabCounts = {
    burnCandidates: burnCandidateTokens.length,
    verifiedTokens: verifiedTokens.length,
    zeroBalance: zeroBalanceAccounts.length,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <Zap className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-green-300 font-medium">Close & Reclaim</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Manage Your Accounts</h1>
        <p className="text-gray-400">Select accounts to close and reclaim your SOL rent</p>
      </div>

      <PortfolioStats stats={stats} />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} counts={tabCounts} />

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
        {activeTab === "verified-tokens" && (
          <TokenSection
            type="verified"
            tokens={verifiedTokens}
            selectedTokens={selectedVerifiedTokens}
            onToggleSelection={index => toggleSelection("verified", index)}
            onSelectAll={() => handleSelectAll("verified")}
          />
        )}

        {activeTab === "tokens" && (
          <TokenSection
            type="burn"
            tokens={burnCandidateTokens}
            selectedTokens={selectedBurnTokens}
            onToggleSelection={index => toggleSelection("burn", index)}
            onSelectAll={() => handleSelectAll("burn")}
          />
        )}

        {activeTab === "zero-balance" && (
          <ZeroBalanceSection
            count={zeroBalanceAccounts.length}
            totalRent={zeroBalanceAccounts.reduce((sum, acc) => sum + acc.rentAmount, 0)}
          />
        )}
      </div>

      {/* Transaction Summary */}
      {(totalSelected > 0 || zeroBalanceAccounts.length > 0) && (
        <TransactionSummary
          summary={{
            zeroCount,
            burnCount,
            verifiedCount,
            totalRent,
          }}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">
            Process {zeroCount + totalSelected} Accounts & Reclaim {formatNumber(totalRent)} SOL
          </span>
          <span className="sm:hidden">Process {zeroCount + totalSelected} Accounts</span>
        </button>
      </div>
    </div>
  );
};

export default ReclaimPage;
