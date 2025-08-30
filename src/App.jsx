import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";

import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import BackgroundElements from "./components/BackgroundElements";

import HomePage from "./pages/HomePage";
const ReclaimPage = lazy(() => import("./pages/ReclaimPage"));
const WalletConnectionPage = lazy(() => import("./pages/WalletConnectionPage"));

import getSolPrice from "./services/getSolPrice";
import { checkAndCleanupStoredKey } from "./utils/EncryptStorage";

function App() {
  const location = useLocation();
  const [solPrice, setSolPrice] = useState(0);

  useEffect(() => {
    checkAndCleanupStoredKey();
    getSolPrice().then(setSolPrice);
  }, []);

  // For analytics: track page views and identify user by wallet
  useEffect(() => {
    const userId = localStorage.getItem("walletAddress");
    if (userId && window.umami) {
      window.umami.identify(userId.slice(4, 15), { walletAddress: userId });
    }

    if (window.umami) {
      window.umami.track();
    }
  }, [location]);

  return (
    <div className="app">
      <BackgroundElements />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage solPrice={solPrice} />} />
            <Route
              path="/connect-wallet"
              element={
                <Suspense fallback={<Loading placeholder="Please wait a moment..." />}>
                  <WalletConnectionPage />
                </Suspense>
              }
            />
            <Route
              path="/manage-wallet"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading placeholder="Fetching your portfolio..." />}>
                    <ReclaimPage solPrice={solPrice} />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
