import React, { useState, lazy, Suspense, useEffect } from "react";

import Loading from "../components/Loading";
import { Hero, SearchCard } from "../components/home";
const SearchResults = lazy(() => import("../components/home/SearchResults"));
const DeferredContent = lazy(() => import("../components/home/DeferredContent"));

import getAppStats from "../services/getAppStats";
import { calculateTotalRentInSOL } from "../utils";
import { getAccOverview } from "../services/getWalletDetails";

const HomePage = ({ solPrice }) => {
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [stats, setStats] = useState({ accountsClosed: 0, solRecovered: 0, totalValue: 0 });

  const [isSearching, setIsSearching] = useState(false);
  const [loadSections, setLoadSections] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Paste Solana Wallet Address");

  useEffect(() => {
    const savedStats = localStorage.getItem("stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    if (solPrice) {
      getAppStats().then(({ totalReclaimedAccounts: totalAcc }) => {
        const totalSol = calculateTotalRentInSOL(totalAcc);
        const totalValueRaw = totalSol * solPrice;
        const totalValue = `$${Math.round(totalValueRaw).toLocaleString()}`;

        const newStats = {
          accountsClosed: totalAcc.toLocaleString(),
          solRecovered: totalSol.toFixed(4),
          totalValue,
        };

        setStats(newStats);
        localStorage.setItem("stats", JSON.stringify(newStats));
      });
    }

    setLoadSections(true);
  }, [solPrice]);

  const handleSearch = async () => {
    const walletAddress = address.trim();
    if (!/^[A-Za-z0-9]{32,44}$/.test(walletAddress)) {
      resetSearch();
      setErrorMsg("Oops! Invalid Solana address");
      setTimeout(() => setErrorMsg("Enter Your Solana Wallet Address"), 2800);
      return;
    }

    try {
      setIsSearching(true);
      const data = await getAccOverview(walletAddress);
      setSearchResults({ ...data, totalUSD: data.solBalance * solPrice });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to fetch portfolio");
      setTimeout(() => setErrorMsg("Paste Your Solana Wallet Address"), 2800);
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchResults(null);
    setAddress("");
  };

  return (
    <>
      <Hero />

      <SearchCard
        address={address}
        setAddress={setAddress}
        isSearching={isSearching}
        handleSearch={handleSearch}
        placeholder={errorMsg}
        usage={stats}
      />
      {/* 
      <div className="text-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-gray-400 text-sm">or</div>
          <button
            // onClick={() => navigate("/portfolio")}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span>Connect Wallet</span>
          </button>
        </div>
      </div> */}

      {searchResults && (
        <Suspense fallback={<Loading placeholder="Loading results..." />}>
          <SearchResults searchResults={searchResults} resetSearch={resetSearch} />
        </Suspense>
      )}

      {loadSections && (
        <Suspense fallback={<div>check your internet connection</div>}>
          <DeferredContent />
        </Suspense>
      )}
    </>
  );
};

export default HomePage;
