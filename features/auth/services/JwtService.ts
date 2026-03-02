import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import User from "../models/UserModel";
import dbConnect from "@/lib/db";

interface JWTPayload {
    _id: string
    email: string
    name: string | undefined
    role: string
    avatar: string | undefined
    description: string | undefined
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const signToken = (payload: JWTPayload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'} )
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload

    } catch (error) {
        throw new Error('Invalid token')
    }
}

export async function getUserFromToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  const decoded: any = jwt.verify(token, JWT_SECRET);

  await dbConnect();
  return User.findById(decoded.userId);
}

