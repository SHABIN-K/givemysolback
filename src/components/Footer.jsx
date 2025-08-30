import React from "react";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 sm:h-[28rem] sm:w-[28rem] rounded-full bg-gradient-to-r from-pink-500/20 via-orange-500/10 to-pink-500/20 blur-3xl" />
      </div>

      {/* Subtle dotted grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "#ffffff",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 text-center">
        <div className="relative inline-flex items-center justify-center">
          <Sparkles className="hidden sm:block absolute -left-10 -top-8 h-8 w-8 text-pink-400/80" />
          <Sparkles className="hidden sm:block absolute -right-10 -bottom-8 h-8 w-8 text-orange-400/80" />
          <h2 className="text-[34px] leading-[1.05] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            Code you can see.
            <br className="hidden sm:block" />
            <span className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500">
              Results you can trust.
            </span>
          </h2>

          {/* Floating accent orbs */}
          <span className="hidden md:block absolute -left-24 top-10 h-3 w-3 rounded-full bg-pink-400/70 blur-[1px]" />
          <span className="hidden md:block absolute -left-24 top-10 h-3 w-3 rounded-full bg-pink-400/70 animate-ping" />
          <span className="hidden md:block absolute -right-24 -bottom-4 h-3 w-3 rounded-full bg-orange-400/70 blur-[1px]" />
          <span className="hidden md:block absolute -right-24 -bottom-4 h-3 w-3 rounded-full bg-orange-400/70 animate-ping" />
        </div>

        <p className="mt-4 sm:mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Every feature is built in the open—because your SOL deserves transparency.
        </p>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href="https://github.com/SHABIN-K/givemysolback"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="social-github"
            className="group w-auto px-5 sm:px-6 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white/90 hover:bg-gray-700/80 hover:border-gray-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Star on GitHub</span>
            <span className="text-xs opacity-70">⭐</span>
          </a>
        </div>

        {/* Gradient divider */}
        <div className="mx-auto mt-8 h-[1px] w-48 sm:w-64 bg-gradient-to-r from-transparent via-pink-500/60 to-transparent" />
      </div>

      <div className="text-center mt-8 text-gray-400">
        <p className="text-sm">An open-source project made with 💜 for Solana.</p>
      </div>
    </section>
  );
};

export default Footer;
