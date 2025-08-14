import * as accountLookup from "./routes/account-lookup.js";
import * as accountOverview from "./routes/account-overview.js";
import * as generateSignableTx from "./routes/generate-signable-tx.js";

const routeMap = {
  "/account-lookup": accountLookup,
  "/account-overview": accountOverview,
  "/generate-signable-tx": generateSignableTx,
};

export function getHandler(pathname) {
  return routeMap[pathname] || null;
}
