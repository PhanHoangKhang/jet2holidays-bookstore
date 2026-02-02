import { getBookDetail } from "@/features/book/services/book.service";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {id: string}}) {
    await connectDB()

    const {item, products} = await getBookDetail(params.id)

    return NextResponse.json({item, products})
}