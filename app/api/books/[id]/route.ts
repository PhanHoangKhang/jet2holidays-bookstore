import { getBookDetail } from "@/features/book/services/BookService";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Missing book id" }, { status: 400 });
    }

    const { item, products, reviews, ratingMap } = await getBookDetail(id);

    return NextResponse.json({ item, products, reviews, ratingMap });
  } catch (error) {
    console.error("GET /api/books/[id] error:", error);

    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
}
