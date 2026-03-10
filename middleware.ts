import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value as string;
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  } else if (token) {
    if (pathname === "/auth/signin" || pathname === "/auth/signup") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// CHỈ CHẠY MIDDLEWARE Ở NHỮNG ROUTE NÀY
export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/admin/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
};
