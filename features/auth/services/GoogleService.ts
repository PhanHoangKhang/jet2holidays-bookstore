import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/UserModel";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

interface GooglePayload {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export const GoogleAuth = async (token: string) => {
  // Verify Google token
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload() as GooglePayload;

  if (!payload?.email) {
    throw new Error("Invalid Google token");
  }

  // Check user tồn tại chưa
  let user = await User.findOne({ email: payload.email });

  if (!user) {
    //  Nếu chưa có → tạo user mới
    user = await User.create({
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
    });
  }

  // Tạo JWT của hệ thống mình
  const appToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      description: user.description
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token: appToken,
    user,
  };
};