import jwt from "jsonwebtoken";

interface JWTPayload {
    _id: string
    email: string
    role: string
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

