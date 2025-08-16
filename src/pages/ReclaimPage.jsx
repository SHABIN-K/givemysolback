import { Zap, Flame, LogOut } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";

import Loading from "../components/Loading";
import InfoBanner from "../components/InfoBanner";
const TxConfig = lazy(() => import("../components/reclaim/Transaction"));

import { TokenSection, TransactionSummary, ZeroBalanceSection, TabNavigation } from "../components/reclaim";

import solanaClient from "../client/solana";
import signAllBatches from "../utils/signAllBatches";
import useWalletManager from "../hooks/useWalletManager";
import { getSignableTx } from "../services/getWalletDetails";
import { useAccountLookup } from "../services/useAccountLookup";
import { calculateTotalRentInSOL, formatNumber } from "../utils";

const ReclaimPage = () => {
  const wallet = useWallet();
  const { publicKey, disconnect } = useWalletManager();
  const { accountData: accOverview, loading: isLoading } = useAccountLookup(publicKey);

  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const [txError, setTxError] = useState("");
  const [txStatus, setTxStatus] = useState(false);
  const [showTransactionSettings, setShowTransactionSettings] = useState(false);

  useEffect(() => {
    if (!accOverview) return;

    // Restore whitelist from localStorage
    const stored = localStorage.getItem("whitelistedMints");
    setSelected(JSON.parse(stored));

    // Sort tabs dynamically
    const sorted = [
      { id: "tokens", count: accOverview.burnTokenAccCount },
      { id: "zero-balance", count: accOverview.zeroBalanceAccCount },
    ].sort((a, b) => b.count - a.count);

    setActiveTab(sorted[0].id);
  }, [accOverview, publicKey]);

  const sortedTabs = useMemo(() => {
    if (!accOverview) return [];

    return [
      { id: "tokens", label: "Burn", count: accOverview?.burnTokenAccCount, icon: Flame, color: "red" },
      { id: "zero-balance", label: "Zero Balance", count: accOverview?.zeroBalanceAccCount, icon: Zap, color: "green" },
    ].sort((a, b) => b.count - a.count);
  }, [accOverview]);

  const summary = useMemo(() => {
    if (!accOverview) return null;
    const burnCount = accOverview.burnTokenAccCount - selected.length || 0;
    const zeroCount = accOverview.zeroBalanceAccCount || 0;

    const burnRent = calculateTotalRentInSOL(burnCount);
    const zeroBalanceRent = calculateTotalRentInSOL(zeroCount);

    const totalRent = burnRent + zeroBalanceRent;

    return {
      burnCount,
      zeroCount,
      totalSelected: zeroCount + burnCount,
      totalRent,
      zeroBalanceRent,
    };
  }, [accOverview, selected]);

  const tabComponents = {
    tokens: <TokenSection tokensCount={accOverview?.burnTokenAccCount || 0} safeMints={selected} setSafeMints={setSelected} />,
    "zero-balance": <ZeroBalanceSection count={summary?.zeroCount} totalRent={summary?.zeroBalanceRent} />,
  };

  const handleProceedTx = async () => {
    setTxStatus(true);

    try {
      const ignoreMints = selected.map(item => item.mint);

      if (selected) return null;

      // Get signable transactions from backend
      const { txs } = await getSignableTx({
        wallet: publicKey,
        ignoreMints,
      });

      console.log(txs);

      // Process in fixed order: closeOnly + burnOnly → closeAfterBurn
      const closeAndBurnTxs = [...(txs.closeOnly || []), ...(txs.burnOnly || [])];

      const order = [
        // Accounts that can be closed immediately (zero balance) or need burning
        { key: "mergedCloseBurn", label: "Close & Burn Only", txArray: closeAndBurnTxs },
        // Accounts that must be closed only after their tokens are burned
        { key: "closeAfterBurn", label: "Close After Burn", txArray: txs.closeAfterBurn || [] },
      ];

      let txids = [];

      for (const { label, txArray } of order) {
        if (!txArray.length) {
          console.log(`⚠️ Skipping ${label} — no transactions`);
          continue;
        }

        console.log(`🚀 Processing ${label} (${txArray.length} transactions)`);
        const batchTxids = await signAllBatches(label, txArray, wallet);
        txids.push(...batchTxids);
      }

      for (const txid of txids) {
        await solanaClient.confirmTransaction(txid, {
          commitment: "confirmed",
          strategy: { type: "single" },
        });

        console.log("🎯Confirmed:", txid.slice(0, 10));
      }
    } catch (err) {
      console.error("TX Error:", err);
      setTxError(err.message || "Transaction failed");
    } finally {
      setTxStatus(false);
      setTxError("");
    }
  };

  return isLoading ? (
    <Loading placeholder="Loading your portfolio..." />
  ) : (
    <>
      <div className="min-h-screen py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-green-300 font-medium">Close & Reclaim</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage Your Accounts</h1>
        </div>

        <button
          onClick={disconnect}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium shadow-sm border border-neutral-700 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={sortedTabs} />

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
          {accOverview?.hasMoreData && (
            <InfoBanner
              title="Large Portfolio Detected"
              description="Due to your extensive token holdings, we're displaying a curated selection of the most relevant accounts. This includes high-value tokens, zero-balance accounts, and tokens that may benefit from cleanup to optimize your portfolio."
            />
          )}

          {tabComponents[activeTab]}
        </div>

        {/* Transaction Summary */}
        {summary?.totalSelected > 0 && (
          <TransactionSummary
            summary={{
              burnCount: summary?.burnCount,
              zeroCount: summary?.zeroCount,
              totalRent: summary?.totalRent,
            }}
          />
        )}

        {/* Action Buttons */}
        {!showTransactionSettings && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              onClick={() => setShowTransactionSettings(true)}
              disabled={summary?.totalSelected === 0}
              aria-label={`Process ${summary?.totalSelected} accounts`}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">
                {summary?.totalSelected === 0
                  ? "Nothing to reclaim at the moment"
                  : `Process ${summary?.totalSelected} Accounts & Reclaim ${formatNumber(summary?.totalRent)} SOL`}
              </span>
              <span className="sm:hidden">Process {summary?.totalSelected} Accounts</span>
            </button>
          </div>
        )}

        {showTransactionSettings && (
          <Suspense fallback={<Loading placeholder="please wait..." />}>
            <TxConfig onProceed={handleProceedTx} isLoading={txStatus} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default ReclaimPage;
