import React from "react";
import { Zap, Shield, Sparkles } from "lucide-react";

const Features = ({ hasSearched }) => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Scan thousands of transactions in seconds",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "No private keys required, read-only access",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: Sparkles,
      title: "Always Free",
      description: "No hidden fees, no subscriptions needed",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-3 gap-6 ${
        hasSearched ? "mt-16" : "mt-16"
      } max-w-4xl mx-auto`}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Features;
