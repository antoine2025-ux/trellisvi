import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const LEGACY_HOSTS = new Set(["trellistudio.tech", "www.trellistudio.tech"]);

function requestHostname(request: Request): string {
  const header = request.headers.get("host");
  const raw = header ?? new URL(request.url).host;
  return raw.replace(/:\d+$/, "").toLowerCase();
}

function legacyStudioPath(pathname: string): string {
  let path = pathname || "/";
  if (path === "/studio" || path.startsWith("/studio/")) {
    path = path.slice("/studio".length);
  }
  if (path === "" || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function redirectLegacyHost(request: Request): Response | undefined {
  if (!LEGACY_HOSTS.has(requestHostname(request))) return undefined;
  const url = new URL(request.url);
  const target = new URL(`https://www.powerintel.co/studio${legacyStudioPath(url.pathname)}`);
  target.search = url.search;
  return Response.redirect(target.toString(), 301);
}

function redirectBareRoot(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (url.pathname !== "/") return undefined;
  url.pathname = "/studio";
  return Response.redirect(url.toString(), 307);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const legacyRedirect = redirectLegacyHost(request);
    if (legacyRedirect) return legacyRedirect;
    const rootRedirect = redirectBareRoot(request);
    if (rootRedirect) return rootRedirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
