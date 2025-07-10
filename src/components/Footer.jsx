import React from "react";

const Footer = ({ hasSearched }) => {
  return (
    <footer
      className={`text-center ${hasSearched ? "mt-16" : "mt-16"} text-gray-400`}
    >
      <p className="text-sm mb-4">
        Made with 💜 for the Solana community by degens, for degens
      </p>
      <div className="flex items-center justify-center space-x-8 text-xs">
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>All systems operational</span>
        </span>
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Mainnet ready</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
