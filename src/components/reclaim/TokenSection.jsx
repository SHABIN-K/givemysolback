import React, { useCallback, useState } from "react";
import { Flame, Plus, TrendingUp } from "lucide-react";

import TokenCard from "./TokenCard";
import EmptyState from "./EmptyState";
import getMintDetails from "../../services/getMintDetails";

const TokenSection = ({ tokensCount, safeMints, setSafeMints }) => {
  const [mintInput, setMintInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("Paste Your mint Address");

  const LOCAL_STORAGE_KEY = "whitelistedMints";

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleAddSafeToken();
    }
  };

  const resetInput = () => {
    setTimeout(() => setErrorMsg("Paste Your mint Address"), 2800);
    setMintInput("");
  };

  const handleAddSafeToken = useCallback(async () => {
    const mintAddress = mintInput.trim();

    if (!/^[A-Za-z0-9]{32,44}$/.test(mintAddress)) {
      setErrorMsg("Oops! Invalid mint address");
      resetInput();
      return;
    }

    const alreadyExists = safeMints.some(token => token.mint === mintAddress);

    try {
      if (alreadyExists) {
        console.log("⏩ Mint already saved", mintAddress.slice(0, 8));
        setErrorMsg("Mint already saved");
        resetInput();
        return;
      }

      const details = await getMintDetails(mintAddress);

      setSafeMints(prev => {
        if (prev.some(t => t.mint === details.mint)) return prev;
        const updated = [...prev, details];

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setErrorMsg("Failed to fetch token details");
      resetInput();
    } finally {
      resetInput();
    }
  }, [mintInput, setSafeMints, safeMints]);

  const handleRemoveToken = mint => {
    setSafeMints(prev => {
      const updated = prev.filter(token => token.mint !== mint);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      {tokensCount === 0 && (
        <EmptyState
          icon={Flame}
          title="No Tokens to Burn"
          description="Great! No low-value or scam tokens found in your portfolio. All your tokens appear to have good value."
        />
      )}

      {tokensCount != 0 && (
        <>
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2.5 sm:mb-3">Keep Tokens Safe (Enter Mint Addresses)</label>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <input
                type="text"
                value={mintInput}
                onChange={e => setMintInput(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder={errorMsg}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleAddSafeToken}
                disabled={!mintInput.trim()}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Token</span>
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2">Enter Mint addresses that you want to keep safe during cleanup</p>
          </div>

          {/* Manual Tokens List */}
          {safeMints?.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {safeMints.map((token, index) => (
                <TokenCard key={index} token={token} handleRemoveToken={handleRemoveToken} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-300 mb-2">No Protected Tokens</h4>
              <p className="text-gray-500 text-sm sm:text-base">
                No tokens are protected right now. If there are tokens you want to keep, add their mint addresses above —
                otherwise, all tokens will be cleaned up.{" "}
                <a
                  href="https://youtu.be/vE_w_H-og3M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Still confused? Click here
                </a>{" "}
                to learn more.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TokenSection;
