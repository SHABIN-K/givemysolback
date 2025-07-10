import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchCard from "./components/SearchCard";
import SearchResults from "./components/SearchResults";
import Features from "./components/Features";
import Footer from "./components/Footer";
import BackgroundElements from "./components/BackgroundElements";

function App() {
  const [address, setAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data for demonstration
  const mockResults = {
    totalValue: 247.83,
    solBalance: 12.45,
    tokens: [
      {
        symbol: "BONK",
        name: "Bonk",
        balance: "1,234,567.89",
        value: 156.78,
        mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      },
      {
        symbol: "WIF",
        name: "dogwifhat",
        balance: "45.67",
        value: 78.34,
        mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
      },
      {
        symbol: "PEPE",
        name: "Pepe",
        balance: "89,123.45",
        value: 0.71,
        mint: "BxnUDmKjYkKAyhwQFQCLbGqzMpKbzRjkJSzXPTbYqKjR",
      },
    ],
    nfts: [
      {
        name: "Mad Lads #1234",
        collection: "Mad Lads",
        value: 45.67,
        image:
          "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      },
      {
        name: "DeGods #5678",
        collection: "DeGods",
        value: 23.45,
        image:
          "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      },
    ],
  };

  const handleSearch = () => {
    if (!address.trim()) return;

    setIsSearching(true);
    setHasSearched(false);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      setSearchResults(mockResults);
    }, 2000);
  };

  const resetSearch = () => {
    setSearchResults(null);
    setHasSearched(false);
    setAddress("");
  };

  return (
    <div className="app">
      <BackgroundElements />

      <Header />

      <main className="main-content">
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
