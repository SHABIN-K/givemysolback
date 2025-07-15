import React, { useState, lazy, Suspense } from "react";

import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Features from "../components/Features";
import SearchCard from "../components/SearchCard";
const SearchResults = lazy(() => import("../components/SearchResults"));

import { getAccOverview } from "../services/getAccOverview";

const HomePage = ({ solPrice }) => {
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Paste Your Solana Wallet Address");

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
