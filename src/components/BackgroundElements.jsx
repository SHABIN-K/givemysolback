import React from "react";

const BackgroundElements = ({ showPopup, onClose }) => {
  return (
    <>
      <div className="background-elements">
        <div className="gradient-blob" />
        <div className="gradient-blob" />
        <div className="gradient-blob" />
      </div>

      {showPopup && (
        <a
          href="https://t.me/Ericdaniyel"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 bottom-4 right-4 max-w-xs w-full bg-white rounded-3xl p-2 flex items-start space-x-3"
        >
          <div className="flex-shrink-0">
            <div className="bg-orange-200 text-white w-10 h-10 flex items-center justify-center rounded-full">👋</div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-900">Need help exploring GivemySolback?</p>
            <p className="text-xs text-gray-500 mt-1">shabin · Just now</p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">
            ✕
          </button>
        </a>
      )}
    </>
  );
};

export default BackgroundElements;
