import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Log incoming requests
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);

  // Check if the request is for the API
  if (request.nextUrl.pathname.startsWith("/api")) {
    try {
      // Add request ID for tracking
      const requestId = crypto.randomUUID();
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-request-id", requestId);

      // Add CORS headers
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      return response;
    } catch (error) {
      console.error("Middleware error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  // Protect routes that require authentication
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if (!token && !isAuthPage) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/properties/:path*",
    "/tenants/:path*",
    "/maintenance/:path*",
    "/documents/:path*",
    "/payments/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
