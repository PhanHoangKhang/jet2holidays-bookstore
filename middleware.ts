import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./features/auth/services/JwtService";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value as string;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    verifyToken(token);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

// CHỈ CHẠY MIDDLEWARE Ở NHỮNG ROUTE NÀY
export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/admin/:path*"],
};
