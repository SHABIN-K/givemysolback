/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getHandler } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 🔒 Global api key checker
    if (env.PROJECT_MODE === "PRODUCTION") {
      const key = request.headers.get("x-api-key");
      if (key !== env.PRIVATE_API_KEY) {
        return new Response("Unauthorized – Invalid API key", { status: 403 });
      }
    }

    // ✅ Continue to route
    const handler = getHandler(path);
    if (handler && typeof handler.onRequestGet === "function") {
      return handler.onRequestGet({ request, env, ctx });
    }

    return new Response("404: Not Found", { status: 404 });
  },
};
