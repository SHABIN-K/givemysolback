import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";

import HomePage from "./pages/HomePage";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

import BackgroundElements from "./components/BackgroundElements";
const ReclaimPage = lazy(() => import("./pages/ReclaimPage"));
const WalletConnectionPage = lazy(() => import("./pages/WalletConnectionPage"));

import getSolPrice from "./services/getSolPrice";
import { checkAndCleanupStoredKey } from "./utils/EncryptStorage";

function App() {
  const [solPrice, setSolPrice] = useState(0);

  useEffect(() => {
    checkAndCleanupStoredKey();
    getSolPrice().then(setSolPrice);
  }, []);

  return (
    <div className="app">
      <BackgroundElements />

      <main className="main-content p-6">
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
                    <ReclaimPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
