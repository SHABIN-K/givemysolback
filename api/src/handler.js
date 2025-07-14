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

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

export default {
  async fetch(request, env, ctx) {
    const { method } = request;
    const url = new URL(request.url);
    const path = url.pathname;

    // 🔁 Handle preflight OPTIONS requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // 🔒 Global api key checker
    if (env.PROJECT_MODE === "PRODUCTION") {
      const key = request.headers.get("x-api-key");
      if (key !== env.PRIVATE_API_KEY) {
        return new Response("Unauthorized – Invalid API key", {
          status: 403,
          headers: CORS_HEADERS,
        });
      }
    }

    // 🔀 Route matching
    const handler = getHandler(path);
    if (handler && typeof handler.onRequestGet === "function") {
      const response = await handler.onRequestGet({ request, env, ctx });

      // 🧠 Ensure handler response has CORS headers
      return new Response(response.body, {
        status: response.status || 200,
        headers: {
          ...CORS_HEADERS,
          ...Object.fromEntries(response.headers || []),
        },
      });
    }

    // 🟥 404 fallback
    return new Response("404: Not Found", {
      status: 404,
      headers: CORS_HEADERS,
    });
  },
};
