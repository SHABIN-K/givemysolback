export const zeroBalanceAccounts = [
  {
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    tokenName: "BONK",
    rentAmount: 0.00203928,
    status: "Zero Balance",
    canClose: true,
  },
  {
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    tokenName: "WIF",
    rentAmount: 0.00203928,
    status: "Zero Balance",
    canClose: true,
  },
  {
    address: "BxnUDmKjYkKAyhwQFQCLbGqzMpKbzRjkJSzXPTbYqKjR",
    tokenName: "PEPE",
    rentAmount: 0.00203928,
    status: "Zero Balance",
    canClose: true,
  },
  {
    address: "FkjXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB789",
    tokenName: "USDC",
    rentAmount: 0.00203928,
    status: "Zero Balance",
    canClose: true,
  },
];

export const burnCandidateTokens = [
  {
    address: "GhiQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcAB",
    tokenName: "SCAM Token",
    symbol: "STK",
    balance: "1,000,000",
    value: 2.5, // More than $1
    rentAmount: 0.00203928,
    reason: "Worthless/Scam Token",
    warning: "Token value is low but above $1",
  },
  {
    address: "JklMNO8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB456",
    tokenName: "Dead Project",
    symbol: "DPJ",
    balance: "500",
    value: 1.25, // More than $1
    rentAmount: 0.00203928,
    reason: "Project Abandoned",
    warning: "No trading activity for months",
  },
];

export const verifiedTokens = [
  {
    address: "So11111111111111111111111111111111111111112",
    tokenName: "Wrapped SOL",
    symbol: "SOL",
    balance: "2.5",
    value: 500.0,
    rentAmount: 0.00203928,
    verified: true,
    warning: "High value token - confirm before closing",
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    tokenName: "USD Coin",
    symbol: "USDC",
    balance: "150.00",
    value: 150.0,
    rentAmount: 0.00203928,
    verified: true,
    warning: "Stable coin with real value",
  },
  {
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    tokenName: "Bonk",
    symbol: "BONK",
    balance: "1,000,000",
    value: 25.5,
    rentAmount: 0.00203928,
    verified: true,
    warning: "Popular meme coin with value",
  },
];
