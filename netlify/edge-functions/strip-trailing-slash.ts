import type { Context } from "https://edge.netlify.com";

export default async function stripTrailingSlash(request: Request, context: Context) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname !== "/" && pathname.endsWith("/")) {
    const trimmedPath = pathname.replace(/\/+$/, "") || "/";
    return Response.redirect(`${url.origin}${trimmedPath}${url.search}`, 301);
  }

  return context.next();
}
