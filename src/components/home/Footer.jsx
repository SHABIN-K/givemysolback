import React from "react";

const Footer = ({ hasSearched }) => {
  return (
    <footer
      className={`text-center ${hasSearched ? "mt-16" : "mt-16"} text-gray-400`}
    >
      <p className="text-sm mb-4">
        Made with 💜 for the Solana community by degens, for degens
      </p>
    </footer>
  );
};

export default Footer;
