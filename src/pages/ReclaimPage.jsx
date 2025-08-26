import { Zap, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";

import Loading from "../components/Loading";
import InfoBanner from "../components/InfoBanner";
const TxConfig = lazy(() => import("../components/reclaim/Transaction"));
const TransactionModal = lazy(() => import("../components/reclaim/TransactionModal"));

import { TokenSection, TransactionSummary, ZeroBalanceSection, TabNavigation } from "../components/reclaim";

import solanaClient from "../client/solana";
import signAllBatches from "../utils/signAllBatches";
import useWalletManager from "../hooks/useWalletManager";
import { decryptPrivateKey } from "../utils/EncryptStorage";
import { getSignableTx } from "../services/getWalletDetails";
import { useAccountLookup } from "../services/useAccountLookup";
import { calculateTotalRentInSOL, formatNumber } from "../utils";

const ReclaimPage = ({ solPrice }) => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const { walletAddress, publicKey: walletPubkey, source } = useWalletManager();
  const { accountData: accOverview, loading: isLoading, refetch } = useAccountLookup(walletAddress);

  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [progress, setProgress] = useState({
    isProcessing: false,
    isComplete: false,
    hasError: false,
    step: 0,
    batch: 0,
    tx: 0,
    stepStatus: {},
    failedBatches: [],
    skippedBatches: [],
    successfulTxs: 0,
    failedTxs: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTransactionSettings, setShowTransactionSettings] = useState(false);

  useEffect(() => {
    if (!accOverview) return;

    // Restore whitelist from localStorage
    const stored = localStorage.getItem("whitelistedMints");
    setSelected(stored ? JSON.parse(stored) : []);

    setActiveTab("tokens");
  }, [accOverview, walletAddress]);

  const summary = useMemo(() => {
    if (!accOverview) return null;
    const burnCount = accOverview.burnTokenAccCount - selected?.length || 0;
    const zeroCount = accOverview.zeroBalanceAccCount || 0;

    const burnRent = calculateTotalRentInSOL(burnCount);
    const zeroBalanceRent = calculateTotalRentInSOL(zeroCount);

    const totalRent = burnRent + zeroBalanceRent;

    return {
      burnCount,
      zeroCount,
      totalSelected: zeroCount + burnCount,
      totalUSD: totalRent * solPrice,
      totalRent,
      zeroBalanceRent,
    };
  }, [accOverview, selected, solPrice]);

  const tabComponents = {
    tokens: <TokenSection tokensCount={accOverview?.burnTokenAccCount || 0} safeMints={selected} setSafeMints={setSelected} />,
    "zero-balance": <ZeroBalanceSection count={summary?.zeroCount} totalRent={summary?.zeroBalanceRent} />,
  };

  const handleProceedTx = async ({ feePayerKey, rentReceiver, commissionPercent }) => {
    setIsModalOpen(true);

    setProgress(prev => ({
      ...prev,
      isProcessing: true,
      isComplete: false,
      hasError: false,
      step: 0,
      batch: 0,
      tx: 0,
      stepStatus: {},
      failedBatches: [],
      skippedBatches: [],
      successfulTxs: 0,
      failedTxs: 0,
    }));

    let failedTxs = 0;
    const stepStatus = {};
    const skippedBatches = [];

    const storageKey = `failedIx_${walletPubkey.toBase58()}`;

    const item = localStorage.getItem(storageKey);
    const uniqueATAs = [...new Set(item ? JSON.parse(item) : [])];

    try {
      const ignoreMints = selected.map(item => ({
        mint: item.mint,
        token22: item.token22,
      }));

      const feePayer = feePayerKey ? feePayerKey.publicKey.toBase58() : undefined;

      // Get signable transactions from backend
      const { txs } = await getSignableTx({
        wallet: walletAddress,
        ignoreMints,
        invalidATA: uniqueATAs,
        paymentConfig: {
          feePayer,
          rentReceiver,
          commissionPercent,
        },
      });

      // Process in order: closeOnly → burnOnly → closeAfterBurn
      const order = [
        { label: "Close Only", txArray: txs.closeOnly || [] },
        { label: "Burn Only", txArray: txs.burnOnly || [] },
        { label: "Close After Burn", txArray: txs.closeAfterBurn || [] },
      ];

      let txids = [];
      let failedInstructions = [];
      let walletkeypair = null;

      if (source === "import") {
        const passphrase = prompt("Enter the password you set when importing your wallet");

        if (!passphrase || passphrase.length < 6) {
          setIsModalOpen(false);
          return;
        }

        // Decrypt the imported wallet's secret key
        walletkeypair = decryptPrivateKey(passphrase);

        // Check if decryption failed
        if (!walletkeypair) {
          console.log("Failed to decrypt wallet with provided password");
          setIsModalOpen(false);
          return;
        }
      }

      stepStatus.fetching = "success";
      setProgress(prev => ({ ...prev, stepStatus, step: 0 }));

      for (let batchIndex = 0; batchIndex < order.length; batchIndex++) {
        const { label, txArray } = order[batchIndex];

        if (!txArray.length) {
          console.log(`⚠️ Skipping ${label} — no transactions`);
          skippedBatches.push(batchIndex);
          setProgress(prev => ({ ...prev, skippedBatches }));
          continue;
        }

        setProgress(prev => ({ ...prev, step: 1, batch: batchIndex, tx: 0 }));
        console.log(`🚀 Processing ${label} (${txArray.length} transactions)`);

        if (batchIndex === 2) await new Promise(resolve => setTimeout(resolve, 1000));

        const batchTxids = await signAllBatches(
          label,
          txArray,
          wallet, // browser wallet adapter
          walletkeypair, // Keypair signer for imported wallet
          walletPubkey,
          feePayerKey,
          failedInstructions,
          ({ txIndex, status }) => {
            setProgress(prev => {
              const successfulTxs = status === "success" ? prev.successfulTxs + 1 : prev.successfulTxs;
              const failedTxs = status === "failed" ? prev.failedTxs + 1 : prev.failedTxs;
              return { ...prev, tx: txIndex + 1, successfulTxs, failedTxs };
            });
          }
        );

        txids.push(...batchTxids);
      }

      if (failedInstructions.length > 0) {
        const indices = failedInstructions.map(b => b.ata);
        localStorage.setItem(storageKey, JSON.stringify(indices));
      }

      for (const [i, txid] of txids.entries()) {
        await solanaClient.confirmTransaction(txid, {
          commitment: "confirmed",
          strategy: { type: "single" },
        });

        console.log("🎯Confirmed:", txid.slice(0, 10));
        setProgress(prev => ({ ...prev, step: 2, tx: i + 1 }));
      }

      setProgress(prev => ({
        ...prev,
        step: 3,
        isProcessing: false,
        isComplete: true,
        hasError: failedTxs > 0,
      }));

      refetch();
    } catch (err) {
      console.error("TX Error:", err);
      setIsModalOpen(false);
    }
  };

  return isLoading ? (
    <Loading placeholder="Loading your portfolio..." />
  ) : (
    <>
      <div className="min-h-screen py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Search</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-green-300 font-medium">Close & Reclaim</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage Your Accounts</h1>
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} accOverview={accOverview} />

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
          {accOverview?.hasMoreData && (
            <InfoBanner
              title="Large Portfolio Detected"
              description="Your wallet holds a large number of token accounts. To keep things manageable, we display a portion at a time. Once you clean up some accounts, more will become available."
            />
          )}

          {tabComponents[activeTab]}
        </div>

        {/* Transaction Summary */}
        {summary?.totalSelected > 0 && <TransactionSummary summary={summary} />}

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
            <TxConfig onProceed={handleProceedTx} isLoading={isModalOpen} />
          </Suspense>
        )}
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} summary={summary} progress={progress} />
    </>
  );
};

export default ReclaimPage;
