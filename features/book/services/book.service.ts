import Book from "../models/BookModel";
import { buildDaysAgo } from "../utils/buildDaysAgo";
import Review from "../models/ReviewModel";
import mongoose from "mongoose";

export const getAllBooks = async (search?: string) => {
  const products = await Book.aggregate([
    { $match: { title: { $regex: search, $options: "i" } } },
    { $sample: { size: 100 } }
  ]);

  const bookTitles = products.map((p) => p.title);

  const reviews = await Review.find({ bookTitle: { $in: bookTitles } }).lean();

  const normalizedReviews = reviews.map((r) => ({
    ...r,
    daysAgo: buildDaysAgo(r.createdAt),
  }));

  const ratingMap: Record<string, number | string> = {};

  bookTitles.forEach((title) => {
    const rs = normalizedReviews.filter((r) => r.bookTitle === title);
    if (!rs.length) return (ratingMap[title] = 0);
    const avg = rs.reduce((s, r) => s + Math.floor(r.rating), 0) / rs.length;
    ratingMap[title] = avg.toFixed(1);
  });

  return { products, ratingMap };
};

export const getBookDetail = async (id: string) => {
  const item = await Book.findById(id).lean();

  if (!item) {
    throw new Error("Book not found");
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const relatedBooks = await Book.find({
    _id: { $ne: objectId },
  })
    .limit(8)
    .lean();

  const titles = [item.title, ...relatedBooks.map((b) => b.title)];

  const reviews = await Review.find({ bookTitle: { $in: titles } }).lean();

  const normalized = reviews.map((r) => ({
    ...r,
    daysAgo: buildDaysAgo(r.createdAt),
  }));

  const ratingMap: Record<string, number | string> = {};

  titles.forEach((title) => {
    const rs = normalized.filter((r) => r.bookTitle === title);
    if (!rs.length) return (ratingMap[title] = 0);
    ratingMap[title] = (
      rs.reduce((s, r) => s + Math.floor(r.rating), 0) / rs.length
    ).toFixed(1);
  });

  return {
    item,
    products: relatedBooks,
    reviews: normalized.filter((r) => r.bookTitle === item.title),
    ratingMap,
  };
};

export const createBook = (data: any) => Book.create(data);

export const getNewBooks = async (limit = 3) => {
  return await Book.find().sort({ createdAt: -1 }).limit(limit).lean();
};

export const getBestSellerBooks = async (limit = 3) => {
  return await Book.find().sort({ createdAt: -1 }).limit(limit).lean();
};
