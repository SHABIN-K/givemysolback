import React from "react";
import { ChevronRight } from "lucide-react";

import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

function TestimonialCard({ name, avatar, content }) {
  return (
    <div className="w-56 sm:w-60 mb-4 sm:mb-6 break-inside-avoid space-y-2 sm:space-y-3 rounded-2xl bg-gray-800/50 border border-gray-700/50 px-4 sm:px-5 py-3 text-xs sm:text-sm shadow-sm sm:p-6 backdrop-blur-xl hover:scale-[1.02] transition duration-200 ease-out">
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <img
          src={avatar}
          alt={name}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/fallback-coin.png";
          }}
          className="size-6 sm:size-7 rounded-full"
        />
        <div className="text-white font-medium text-sm sm:text-base">{name}</div>
      </div>
      <div className="text-gray-300 text-[11px] sm:text-xs font-normal leading-relaxed">{content}</div>
    </div>
  );
}

const Community = () => {
  const socialLinks = [
    {
      name: "Join our Telegram",
      link: "https://t.me/codexbotzsupport",
      classes: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
    },
    {
      name: "Follow on Twiiter",
      link: "https://x.com/givemysolback",
      classes: "bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600",
    },
  ];

  const testimonialsOne = [
    {
      name: "StellarFox",
      quote: "What impressed me most was the transparency—no hidden steps, just clear results.",
      avatar: "https://gateway.irys.xyz/qkA9eXvVtsDu5hr4BNYzyILngrDzkTGKoSOxzDS5iaQ",
    },
    {
      name: "Jordan Lee",
      quote: "Super easy to use—felt like it was made for everyday users like me.",
      avatar: "https://sapphire-working-koi-276.mypinata.cloud/ipfs/bafybeihvuo6kkggegbfykumeldyfaxnexmzjqxiouakwsjbfgwz7zq6k5a",
    },
    {
      name: "AlphaDrip",
      quote: "A reliable tool that actually does what it says—no unnecessary steps.",
      avatar: "https://ipfs.io/ipfs/Qmc4ieJEoSvAMbdN1nCFvxDqoMyXNgaJocYCYQnavztHLc",
    },
    {
      name: "Emily R.",
      quote: "I’ve used other tools before, but this is the first one that feels built for memecoins traders.",
      avatar: "https://pbs.twimg.com/media/GvOsNfrWwAAwy-0?format=jpg&name=small",
    },
    {
      name: "CryptoKitty",
      quote: "I was surprised at how quickly I could reclaim my SOL. Simple and effective!",
      avatar:
        "https://blznujiyxatc2qyysynmwqqqoreckcg2aolugfgoflsqqaiztuiq.arweave.net/CvLaJRi4Ji1DGJYay0IQdEglCNoDl0MUzirlCAEZnRE",
    },
    {
      name: "Rahul Verma",
      quote: "Open source builds trust. If something’s unclear, I can audit it myself.",
      avatar: "https://pbs.twimg.com/media/F5sWrztbsAAcJRn?format=jpg&name=small",
    },
  ];

  const testimonialsTwo = [
    {
      name: "DeFiNomad",
      quote: "I was skeptical at first, but the process worked flawlessly. Now I recommend it to my trading friends",
      avatar: "https://ipfs.io/ipfs/QmQKuTQySG6t6pW2gV3vfmrXEQ2wJkwyqyhKRorPjZpHt7",
    },
    {
      name: "LunaPark",
      quote: "As someone trading daily, this helped me free up SOL I didn’t even realize was locked. Every bit counts.",
      avatar: "https://node1.irys.xyz/vvXjvBJwlLTudsD-gxFCXDkZ7CCbLutxUKDhvGIEyhM",
    },
    {
      name: "BlockNinja",
      quote: "The app works exactly as promised. No confusing steps, just results.",
      avatar: "https://cdn.moonshot.com/OzN3OPbPavejWdQAJX4twX1z.jpg",
    },
    {
      name: "NFTSlayer",
      quote: "It saved me from losing small amounts of SOL I didn’t even notice before.",
      avatar: "https://ipfs.io/ipfs/QmdAQCAKXr2jEDSHwn5XjtWWWMuhB4xCmDhNTqmYgWSuva",
    },
    {
      name: "Alex M",
      quote: "Really impressed with how smooth the process is. Definitely useful.",
      avatar: "https://pbs.twimg.com/media/Gy4Mp1PasAAV6C_?format=jpg&name=900x900",
    },
    {
      name: "ChainSurfer",
      quote: "Knowing the app is open source makes me trust it even more. Transparency matters in crypto.",
      avatar: "https://pbs.twimg.com/media/GvPxx0LWIAAoUoa?format=jpg&name=small",
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">Join the community</h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Discover what our community has to say about their amazing experiences.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-16 px-4">
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {socialLinks.map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-semibold text-white shadow-xl text-sm sm:text-base ${btn.classes}`}
            >
              <p className="flex items-center space-x-2">
                <span>{btn.name} </span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </p>
            </a>
          ))}
        </div>
      </div>

      <Marquee fade={true} pauseOnHover={true}>
        {testimonialsOne.map((testimonial, i) => (
          <TestimonialCard key={i} name={testimonial.name} avatar={testimonial.avatar} content={testimonial.quote} />
        ))}
      </Marquee>
      <Marquee reverse={true} fade={true} pauseOnHover={true}>
        {testimonialsTwo.map((testimonial, i) => (
          <TestimonialCard key={i} name={testimonial.name} avatar={testimonial.avatar} content={testimonial.quote} />
        ))}
      </Marquee>
    </section>
  );
};

export default Community;
