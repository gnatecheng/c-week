/** Canonical host redirect + static assets (ASSETS binding) + optional D1 page access log. */
import { scheduleAccessLog } from "./access-log.js";

const CANONICAL_HOST = "etais.dev";

/** Hosts that must 301 to CANONICAL_HOST (dashboard-managed aliases). */
const REDIRECT_HOSTS = new Set([
  "app.etais.dev",
  "apps.etais.dev",
  "www.etais.dev",
  "etai.chengyitang.workers.dev",
]);

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: (req: Request) => Promise<Response> }, ACCESS_LOG?: import("@cloudflare/workers-types").D1Database }} env
   * @param {ExecutionContext} ctx
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (REDIRECT_HOSTS.has(host)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";
      return new Response(null, {
        status: 301,
        headers: {
          Location: url.toString(),
        },
      });
    }

    if (url.pathname === "/en") {
      url.pathname = "/en/";
      return new Response(null, {
        status: 301,
        headers: { Location: url.toString() },
      });
    }

    const slashPaths = [
      "/easy-ledger",
      "/group-matters",
      "/c-week",
      "/en/easy-ledger",
      "/en/group-matters",
      "/en/c-week",
      "/privacy",
      "/en/privacy",
    ];
    if (slashPaths.includes(url.pathname)) {
      url.pathname = url.pathname + "/";
      return new Response(null, {
        status: 301,
        headers: { Location: url.toString() },
      });
    }

    const response = await env.ASSETS.fetch(request);
    scheduleAccessLog(ctx, request, response, env.ACCESS_LOG, request.cf);
    return response;
  },
};
