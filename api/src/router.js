import * as accountOverview from "./routes/account-overview.js";
import * as accountLookup from "./routes/account-lookup.js";

const routeMap = {
  "/account-overview": accountOverview,
  "/account-lookup": accountLookup,
};

export function getHandler(pathname) {
  return routeMap[pathname] || null;
}
