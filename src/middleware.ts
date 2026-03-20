import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // /s/:storeId is a public affiliate redirect — no auth required
  if (
    pathname.startsWith("/affiliate") &&
    !pathname.startsWith("/affiliate/registration") &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect already-authenticated users away from login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // /register is always public — the page itself handles logout when needed
  // (e.g., when an existing affiliate visits a referral link)

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/affiliate/:path*", "/login"],
};
