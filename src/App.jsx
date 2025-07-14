// import Header from "./components/Header";
import React, { useState, useEffect, lazy, Suspense } from "react";

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Features from "./components/Features";
import SearchCard from "./components/SearchCard";
import BackgroundElements from "./components/BackgroundElements";
const SearchResults = lazy(() => import("./components/SearchResults"));

import getSolPrice from "./services/getSolPrice";
import { getAccOverview } from "./services/getAccOverview";

function App() {
  const [address, setAddress] = useState("");
  const [solPrice, setSolPrice] = useState(0);
  const [searchResults, setSearchResults] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Paste Your Solana Wallet Address");

  useEffect(() => {
    getSolPrice().then(setSolPrice);
  }, []);

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
    <div className="app">
      <BackgroundElements />

      {/* <Header /> */}

      <main className="main-content p-6">
        <div className="container">
          <Hero />

          <SearchCard
            address={address}
            setAddress={setAddress}
            isSearching={isSearching}
            handleSearch={handleSearch}
            placeholder={errorMsg}
          />

          {searchResults && (
            <Suspense
              fallback={
                <div className="max-w-4xl mx-auto mt-16">
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="loading-spinner"></div>
                      <span className="text-gray-300">Loading results...</span>
                    </div>
                  </div>
                </div>
              }
            >
              <SearchResults searchResults={searchResults} resetSearch={resetSearch} />
            </Suspense>
          )}

          <Features hasSearched={!!searchResults?.totalAccounts} />

          <Footer hasSearched={!!searchResults?.totalAccounts} />
        </div>
      </main>
    </div>
  );
}

export default App;
