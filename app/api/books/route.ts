import { getAllBooks } from "@/features/book/services/BookService";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";

  const { products, ratingMap } = await getAllBooks(search);

  return NextResponse.json({ products, ratingMap });
}
