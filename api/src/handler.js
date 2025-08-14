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
    if (handler) {
      let response;

      if (method === "GET" && typeof handler.onRequestGet === "function") {
        response = await handler.onRequestGet({ request, env, ctx });
      } else if (method === "POST" && typeof handler.onRequestPost === "function") {
        response = await handler.onRequestPost({ request, env, ctx });
      } else {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: CORS_HEADERS,
        });
      }

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
