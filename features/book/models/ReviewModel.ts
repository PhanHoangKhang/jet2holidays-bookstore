import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  book: mongoose.Types.ObjectId;
  bookTitle: string;
  userId: mongoose.Types.ObjectId;
  username: string;
  userEmail: string;
  avatar?: string | null;
  rating: number;
  image?: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    bookTitle: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    image: {
      type: String,
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

/**
 * Fix OverwriteModelError khi Next.js hot reload
 */
const Review: Model<IReview> =
  mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);

export default Review;