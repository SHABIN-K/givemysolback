import * as accountOverview from "./routes/account-overview.js";

const routeMap = {
  "/account-overview": accountOverview,
};

export function getHandler(pathname) {
  return routeMap[pathname] || null;
}
