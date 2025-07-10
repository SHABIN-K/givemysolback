import React, { useState } from "react";
// import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchCard from "./components/SearchCard";
import SearchResults from "./components/SearchResults";
import Features from "./components/Features";
import Footer from "./components/Footer";
import BackgroundElements from "./components/BackgroundElements";
import { getUserPortfolio } from "./services/fetchTokens";

function App() {
  const [address, setAddress] = useState("J8Ahi2n5fNVRXAQ8y9noAmg2ztSrJUyvQ14DbZNu9BVv");
  const [errorMsg, setErrorMsg] = useState("Enter Your Solana Wallet Address");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) return;

    const isProbablySolanaAddress = (address) => /^[A-Za-z0-9]{32,44}$/.test(address.trim());

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
      setSearchResults(res);
    } catch (err) {
      console.error("Error fetching portfolio", err);
      const message = err instanceof Error ? err.message : "Failed to fetch portfolio";
      setErrorMsg(message);
      setTimeout(() => {
        setErrorMsg("Enter Your Solana Wallet Address");
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

          {hasSearched && searchResults && (
            <SearchResults
              searchResults={searchResults}
              resetSearch={resetSearch}
            />
          )}

          <Features hasSearched={hasSearched} />

          <Footer hasSearched={hasSearched} />
        </div>
      </main>
    </div>
  );
}

export default App;
