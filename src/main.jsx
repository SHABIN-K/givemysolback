import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import WalletContextProvider from "./provider/WalletProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </BrowserRouter>
);
