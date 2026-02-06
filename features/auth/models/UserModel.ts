import mongoose, {Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
  username?: string;
  email: string;
  password?: string | null;
  googleId?: string | null;
  name?: string;
  phone?: string;
  avatar?: string;
  description?: string;
  role: "admin" | "user";
  isActive: boolean;
  resetCodeHash?: string | null;
  resetCodeExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
{
    username: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
    },

    avatar: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    resetCodeHash: {
      type: String,
      default: null,
    },

    resetCodeExpires: {
      type: Date,
      default: null,
    },
}, {timestamps: true}
)

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User