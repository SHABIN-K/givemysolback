import * as usageStats from "./routes/usage-stats.js";
import * as accountLookup from "./routes/account-lookup.js";
import * as accountOverview from "./routes/account-overview.js";
import * as generateSignableTx from "./routes/generate-signable-tx.js";

const routeMap = {
  "/usage-stats": usageStats,
  "/account-lookup": accountLookup,
  "/account-overview": accountOverview,
  "/generate-signable-tx": generateSignableTx,
};

export function getHandler(pathname) {
  return routeMap[pathname] || null;
}
