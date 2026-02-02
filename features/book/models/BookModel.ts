import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  price: number;
  image: string;
  author: string;
  category: string;
}

const BookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;
