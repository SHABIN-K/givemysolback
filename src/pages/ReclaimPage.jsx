import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Zap, Flame, Shield } from "lucide-react";

// Import components
import TabNavigation from "../components/reclaim/TabNavigation";
import ZeroBalanceSection from "../components/reclaim/ZeroBalanceSection";
import TokenSection from "../components/reclaim/TokenSection";
import TransactionSummary from "../components/reclaim/TransactionSummary";
import { burnCandidateTokens, verifiedTokens, zeroBalanceAccounts } from "../constant";
import { getAccLookup } from "../services/getAccOverview";
import { formatNumber } from "../utils";

const ReclaimPage = () => {
  const [selectedBurnTokens, setSelectedBurnTokens] = useState(new Set());
  const [selectedVerifiedTokens, setSelectedVerifiedTokens] = useState(new Set());
  const [accOverview, setAccOverview] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccLookup("J8Ahi2n5fNVRXAQ8y9noAmg2ztSrJUyvQ14DbZNu9BVv");
      setAccOverview(data);
      console.log(data);

      const sorted = [
        { id: "verified-tokens", count: data.VerifiedAccCount },
        { id: "tokens", count: data.burnTokenAccCount },
        { id: "zero-balance", count: data.zeroBalanceAccCount },
      ].sort((a, b) => b.count - a.count);
  
      setActiveTab(sorted[0].id);
    };

    fetchData();
  }, []);


  const sortedTabs = useMemo(() => {
    if (!accOverview) return [];
  
    return [
      { id: "verified-tokens", label: "Verified Tokens", count: accOverview?.VerifiedAccCount, icon: Shield, color: "blue" },
      { id: "tokens", label: "Burn", count: accOverview?.burnTokenAccCount, icon: Flame, color: "red" },
      { id: "zero-balance", label: "Zero Balance", count: accOverview?.zeroBalanceAccCount, icon: Zap, color: "green" },
    ].sort((a, b) => b.count - a.count);
  }, [accOverview]);


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

  return (
    <div className="min-h-screen py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <Zap className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-green-300 font-medium">Close & Reclaim</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Manage Your Accounts</h1>
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={sortedTabs} />

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
