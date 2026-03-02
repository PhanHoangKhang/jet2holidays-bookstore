export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/features/auth/services/JwtService";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = await verifyToken(token);

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        description: user.description
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
