import React, { useState, lazy, Suspense, useEffect } from "react";

import Loading from "../components/Loading";
import { Hero, Footer, Features, SearchCard } from "../components/home";
const SearchResults = lazy(() => import("../components/home/SearchResults"));

import getAppStats from "../services/getAppStats";
import { calculateTotalRentInSOL } from "../utils";
import { getAccOverview } from "../services/getWalletDetails";

const HomePage = ({ solPrice }) => {
  const [stats, setStats] = useState({
    accountsClosed: 0,
    solRecovered: 0,
    totalValue: 0,
  });

  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
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

      {searchResults && (
        <Suspense fallback={<Loading placeholder="Loading results..." />}>
          <SearchResults searchResults={searchResults} resetSearch={resetSearch} />
        </Suspense>
      )}

      <Features hasSearched={!!searchResults?.totalAccounts} />

      <Footer hasSearched={!!searchResults?.totalAccounts} />
    </>
  );
};

export default HomePage;
