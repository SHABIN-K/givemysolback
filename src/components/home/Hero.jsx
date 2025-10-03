import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden text-center py-12 sm:py-16 md:py-24 px-2 sm:px-6 md:px-8">
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

      <div className="relative">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-2 leading-tight tracking-tight text-white break-words">
          RECLAIM YOUR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500">SOL</span>
        </h1>
      </div>

      <p className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 mx-auto leading-relaxed text-white">
        💰 FROM DEAD MEMECOINS ☠️
      </p>

      <p className="text-xl md:text-3xl font-extrabold  mx-auto text-yellow-400 mb-4">
        🔥 YOUR RUGS ARE LITERALLY STEALING YOUR MONEY 🔥
      </p>

      <div className="text-base sm:text-lg md:text-xl font-semibold max-w-2xl mx-auto text-white">
        <p className="sm:px-4">
          Every <span className="text-red-500 font-bold">RUGGED</span> shitcoin{" "}
          <span className="text-green-400 font-bold ">0.00203928 SOL</span> forever😤
        </p>
        <p>
          Got 500 dead tokens? That's <span className="text-yellow-400 font-bold underline decoration-wavy">1.02+ SOL</span> just
          sitting there💸
        </p>
        <p className="text-pink-500 font-extrabold uppercase">Close Them. Reclaim it. Ape into the next 1000x 🚀🌙</p>
      </div>
    </section>
  );
};

export default Hero;
