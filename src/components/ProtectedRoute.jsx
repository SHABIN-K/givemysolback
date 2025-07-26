import React from "react";
import { Navigate } from "react-router-dom";

import Loading from "./Loading";
import useWalletManager from "../hooks/useWalletManager";

const ProtectedRoute = ({ children }) => {
  const { connected, isChecking } = useWalletManager();

  if (isChecking) {
    return <Loading placeholder="Checking wallet connection..." />;
  }

  if (!connected) {
    return <Navigate to="/connect-wallet" replace />;
  }

  // Render the protected content if wallet is connected
  return children;
};

export default ProtectedRoute;
