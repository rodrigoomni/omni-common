import type { Context } from "@netlify/edge-functions";

/**
 * Basic-auth gate for the staging site.
 *
 * Only runs when the site sets IS_STAGING="true" in its environment.
 * The production site leaves IS_STAGING unset, so this is a no-op there.
 *
 * Config (on the staging site's env vars):
 *   IS_STAGING            = "true"
 *   STAGING_AUTH_USER     = e.g. "omni"
 *   STAGING_AUTH_PASSWORD = the shared team password
 */
export default async (request: Request, context: Context) => {
  const isStaging = Netlify.env.get("IS_STAGING") === "true";
  if (!isStaging) return;

  const user = Netlify.env.get("STAGING_AUTH_USER") ?? "omni";
  const pass = Netlify.env.get("STAGING_AUTH_PASSWORD") ?? "";

  // If no password is configured, fail closed rather than leak.
  if (!pass) {
    return new Response("Staging password not configured.", { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  const expected = "Basic " + btoa(`${user}:${pass}`);
  if (header === expected) {
    // Auth OK — continue through the pipeline, but stamp noindex so search engines never crawl staging.
    const response = await context.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return new Response("Restricted — staging area.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Omni Common Staging", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};

export const config = {
  path: "/*",
};
