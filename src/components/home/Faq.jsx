import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is it safe to use givemySOLback?",
      answer:
        "Absolutely! Whether you connect or import your wallet, we never ask for private keys or seed phrases. All transactions are signed by you, and our project is fully open-source so you can check the code yourself and see exactly how it works.",
    },
    {
      question: "Are there any fees?",
      answer:
        "Absolutely not! Using givemySOLback costs you nothing — 100% of recovered SOL goes straight to you. The only fee is the tiny Solana blockchain fee required for transactions.",
    },
    {
      question: "What if I want to keep certain tokens?",
      answer:
        "No worries! During the cleanup process, you can manually add the token addresses you want to protect. This ensures they remain safe while we process your wallet.",
    },
    {
      question: "What if my wallet doesn’t work properly?",
      answer:
        "Almost any Solana wallet works! If a wallet doesn’t connect properly, you can use our Import Wallet feature to scan it safely.",
    },
    {
      question: "What happens when I burn a token or close an account?",
      answer:
        "Burning a token permanently destroys it and closes the account, returning the rent SOL to your wallet. This action cannot be undone.",
    },
    {
      question: "Is it safe to close token accounts?",
      answer:
        "Absolutely! We only close accounts that are completely empty and unused. You won’t lose any tokens, and your wallet stays fully secure.",
    },
    {
      question: "What is Account Rent?",
      answer:
        "When an account is created on Solana, a small rent fee is required to store its data and process transactions. This rent is refundable when the account is closed.",
    },
  ];

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-12 sm:pb-16">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about reclaiming your SOL
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white pr-3 sm:pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <div className="border-t border-gray-700/50 pt-3 sm:pt-4">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
