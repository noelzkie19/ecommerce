import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // /affiliate/registration is public for new users to sign up
  // /affiliate/landing is public for landing page
  // /affiliate/onboarding now requires authentication (payment flow needs authenticated user)
  if (
    pathname.startsWith("/affiliate") &&
    !pathname.startsWith("/affiliate/registration") &&
    !pathname.startsWith("/affiliate/landing") &&
    !token
  ) {
    // Preserve query params (ref, status) when redirecting to login
    const loginUrl = new URL("/login", request.url);
    // Pass the intended destination as redirect param so login can redirect back after auth
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
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
