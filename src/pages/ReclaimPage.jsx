import { Zap, Flame, LogOut } from "lucide-react";
import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";

import Loading from "../components/Loading";
const TxConfig = lazy(() => import("../components/reclaim/Transaction"));
import InfoBanner from "../components/InfoBanner";
import { TokenSection, TransactionSummary, ZeroBalanceSection, TabNavigation } from "../components/reclaim";

import useSecureSigner from "../hooks/useSecureSigner";
import useWalletManager from "../hooks/useWalletManager";
import { getAccLookup } from "../services/getAccOverview";
import { calculateTotalRentInSOL, formatNumber } from "../utils";
import Token from "../components/reclaim/Token";

const ReclaimPage = () => {
  const { publicKey, disconnect } = useWalletManager();
  const { signAuthorizationMessage, authorizeTokenClosure } = useSecureSigner();

  const [accOverview, setAccOverview] = useState(null);
  const [selected, setSelected] = useState({ burn: new Set() });

  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransactionSettings, setShowTransactionSettings] = useState(false);
  const [txStatus, setTxStatus] = useState(false);
  const [txError, setTxError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) return;

      setIsLoading(true);
      try {
        const data = await getAccLookup(publicKey);
        setAccOverview(data);

        const sorted = [
          { id: "tokens", count: data.burnTokenAccCount },
          { id: "zero-balance", count: data.zeroBalanceAccCount },
        ].sort((a, b) => b.count - a.count);

        setActiveTab(sorted[0].id);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [publicKey]);

  const sortedTabs = useMemo(() => {
    if (!accOverview) return [];

    return [
      { id: "tokens", label: "Burn", count: accOverview?.burnTokenAccCount, icon: Flame, color: "red" },
      { id: "zero-balance", label: "Zero Balance", count: accOverview?.zeroBalanceAccCount, icon: Zap, color: "green" },
    ].sort((a, b) => b.count - a.count);
  }, [accOverview]);

  const summary = useMemo(() => {
    if (!accOverview) return null;

    const fullBurnCount = 0;
    const burnCount = accOverview.burnTokenAccCount - fullBurnCount + selected.burn.size;
    const verifiedCount = 0;
    const zeroCount = accOverview.zeroBalanceAccCount;

    const burnRent = calculateTotalRentInSOL(burnCount);
    const zeroBalanceRent = calculateTotalRentInSOL(zeroCount);

    const totalRent = burnRent + zeroBalanceRent;

    return {
      burnCount,
      zeroCount,
      totalSelected: burnCount + verifiedCount,
      totalRent,
      zeroBalanceRent,
    };
  }, [accOverview, selected]);

  const tabComponents = {
    tokens: (
      <Token
        type="burn"
        tokensCount={accOverview?.burnTokenAccCount || 0}
        selectedTokens={selected.burn}
        setSelected={setSelected}
      />
    ),
    "zero-balance": <ZeroBalanceSection count={summary?.zeroCount} totalRent={summary?.zeroBalanceRent} />,
  };

  const handleProceedTx = async config => {
    setTxStatus(true);

    try {
      const tokenAccounts = ["dcQpxkW9FhVFgS5ZuZ89rGqQFQrKb8PoSRdJZeq9pM8", "2idX5oGgfe5jnqyS7y1H5oKA2enq3nyv3mGTPECAbyVs"];

      // 1. Sign secure message
      const signedData = await signAuthorizationMessage(tokenAccounts);

      // 2. Send signed message to backend (Cloudflare function)
      const res = await authorizeTokenClosure(signedData);

      // 3. Done ✅
      console.log("Tokens closed successfully:", signedData, res);
      // console.log(res);
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
        {(summary?.totalSelected > 0 || summary?.zeroCount > 0) && (
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
              disabled={summary?.totalSelected + summary?.zeroCount === 0}
              aria-label={`Process ${summary?.zeroCount + summary?.totalSelected} accounts`}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">
                {summary?.totalSelected + summary?.zeroCount === 0
                  ? "Nothing to reclaim at the moment"
                  : `Process ${summary?.zeroCount + summary?.totalSelected} Accounts & Reclaim ${formatNumber(
                      summary?.totalRent
                    )} SOL`}
              </span>
              <span className="sm:hidden">Process {summary?.zeroCount + summary?.totalSelected} Accounts</span>
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
