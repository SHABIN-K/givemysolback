import { Plus, TrendingUp } from "lucide-react";
import React, { useCallback, useState } from "react";

import TokenCard from "./TokenCard";
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

  const handleAddSafeToken = useCallback(async () => {
    const mintAddress = mintInput.trim();

    if (!/^[A-Za-z0-9]{32,44}$/.test(mintAddress)) {
      setErrorMsg("Oops! Invalid mint address");
      setTimeout(() => setErrorMsg("Paste Your mint Address"), 2800);
      return;
    }

    const alreadyExists = safeMints.some(token => token.mint === mintAddress);

    try {
      if (alreadyExists) {
        console.log("⏩ Mint already saved", mintAddress.slice(0, 8));
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
      setTimeout(() => setErrorMsg("Paste Your mint Address"), 2800);
    } finally {
      setMintInput("");
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
    <div>
      {/* description="We found <strong>14 tokens</strong> in your wallet. To remove any valuable tokens from the cleanup process, paste their mint addresses below. Only add tokens you want to keep safe." */}

      {/* Manual Token Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-3">Add Token Addresses to Exclude from Cleanup</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={mintInput}
            onChange={e => setMintInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Paste token mint address here..."
            className="flex-1 px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm"
          />
          <button
            onClick={handleAddSafeToken}
            disabled={!mintInput.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Token</span>
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2">Enter Solana token mint addresses that you want to protect from cleanup</p>
      </div>

      {/* Manual Tokens List */}
      {safeMints.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {safeMints.map((token, index) => (
            <TokenCard key={index} token={token} handleRemoveToken={handleRemoveToken} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-xl font-bold text-gray-300 mb-2">No Protected Tokens</h4>
          <p className="text-gray-500">
            Add token addresses above to protect them from cleanup. All {tokensCount} tokens will be processed unless you add
            exceptions.
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenSection;
