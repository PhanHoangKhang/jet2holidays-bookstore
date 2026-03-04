import { NextResponse } from "next/server";
import { GoogleAuth } from "@/features/auth/services/GoogleService";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const result = await GoogleAuth(token);

    const response = NextResponse.json({ user: result.user });

    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Google authentication failed" },
      { status: 401 }
    );
  }
}