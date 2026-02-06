import { signUp } from "@/features/auth/services/auth.service";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB()
        const body = await req.json()

        const { token } = await signUp(body)

        const res = NextResponse.json({message: 'Sign up successfully'})

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res;

    } catch (error: any) {
        console.error(error.message)

        return NextResponse.json({message: error.message || 'Server error'}, { status: error?.status || 500 })
    }
}