import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error("Please define MONGO_URL in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// eslint-disable-next-line no-var
let cached = (global as any).mongoose as MongooseCache;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
