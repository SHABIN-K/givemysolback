// import Header from "./components/Header";
import React, { useState, useEffect } from "react";

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Features from "./components/Features";
import SearchCard from "./components/SearchCard";
import SearchResults from "./components/SearchResults";

import BackgroundElements from "./components/BackgroundElements";
import getSolPrice from "./services/getSolPrice";
import { getUserPortfolio } from "./services/getUserPortfolio";

function App() {
  const [address, setAddress] = useState("");
  const [solPrice, setSolPrice] = useState(0);
  const [searchResults, setSearchResults] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Paste Your Solana Wallet Address");

  useEffect(() => {
    getSolPrice().then(setSolPrice);
  }, []);

  const handleSearch = async () => {
    if (!address.trim()) return;

    const isProbablySolanaAddress = address => /^[A-Za-z0-9]{32,44}$/.test(address.trim());

    if (!isProbablySolanaAddress(address)) {
      resetSearch();
      setErrorMsg("Oops! Invalid Solana address");

      setTimeout(() => {
        setErrorMsg("Enter Your Solana Wallet Address");
      }, 2800);
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    try {
      const res = await getUserPortfolio(address);
      const totalUSD = res.solBalance * solPrice;
      setSearchResults({
        ...res,
        totalUSD,
      });
    } catch (err) {
      console.error("Error fetching portfolio", err);
      const message = err instanceof Error ? err.message : "Failed to fetch portfolio";
      setErrorMsg(message);
      setTimeout(() => {
        setErrorMsg("Paste Your Solana Wallet Address");
      }, 2800);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const resetSearch = () => {
    setSearchResults(null);
    setHasSearched(false);
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

          {hasSearched && searchResults && <SearchResults searchResults={searchResults} resetSearch={resetSearch} />}

          <Features hasSearched={hasSearched} />

          <Footer hasSearched={hasSearched} />
        </div>
      </main>
    </div>
  );
}

export default App;