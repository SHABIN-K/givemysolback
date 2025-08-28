import React from "react";
import { TrendingUp, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden text-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 sm:h-[28rem] sm:w-[28rem] rounded-full bg-gradient-to-r from-pink-500/20 via-orange-500/10 to-pink-500/20 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "#ffffff",
        }}
      />

      <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-full mb-6 sm:mb-8 relative">
        <TrendingUp className="w-4 h-4 mr-2 text-pink-400" />
        <span className="text-sm sm:text-base">Reclaim Your SOL in Seconds</span>
        <Sparkles className="hidden sm:block ml-2 h-4 w-4 text-orange-400/80" />
      </div>

      <div className="relative">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-white break-words">
          givemy
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500">SOL</span>
          back
        </h1>
        <div className="mx-auto h-[3px] w-32 sm:w-48 bg-gradient-to-r from-transparent via-pink-500/70 to-transparent rounded-full" />
      </div>

      <p className="text-base sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed text-gray-300">
        SOL doesn’t disappear — it hides. We help you hunt it down
      </p>

      <p className="text-sm sm:text-lg max-w-2xl mx-auto text-gray-400">
        Thousands of unused accounts are still holding your SOL. Close them and take back what’s yours — instantly, safely, and
        free.
      </p>

      {/* CTA */}
      {/* <div className="mt-6 sm:mt-8 flex justify-center">
        <a
          href="#search"
          className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-orange-600 transition"
        >
          Scan my wallet
        </a>
      </div> */}
    </section>
  );
};

export default Hero;
