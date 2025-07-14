import * as index from "./routes/index.js";

const routeMap = {
  "/": index,
};

export function getHandler(pathname) {
  return routeMap[pathname] || null;
}
