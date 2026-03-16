import type { Context } from "https://edge.netlify.com";

export default async function stripTrailingSlash(
  request: Request,
  context: Context
): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname !== "/" && pathname.endsWith("/")) {
    const trimmed = pathname.replace(/\/+$/, "");
    const target = trimmed || "/";
    url.pathname = target;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
