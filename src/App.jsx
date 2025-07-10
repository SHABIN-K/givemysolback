import React, { useState } from "react";
// import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchCard from "./components/SearchCard";
import SearchResults from "./components/SearchResults";
import Features from "./components/Features";
import Footer from "./components/Footer";
import BackgroundElements from "./components/BackgroundElements";
import { getUserPortfolio } from "./services/fetchTokens";
import { useConnection } from "@solana/kit";
function App() {
  const { connection } = useConnection();
  const [address, setAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsSearching(true);
    setHasSearched(false);

    try {
      const tokens = await getUserPortfolio(connection, address);
      setSearchResults(tokens);
    } catch (err) {
      console.error("Error fetching portfolio", err);
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
