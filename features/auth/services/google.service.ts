import jwt from 'jsonwebtoken'
import User from '../models/UserModel'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const JWT_SECRET = process.env.JWT_SECRET as string

interface GooglePaylaod {
    sub: string
    email: string
    name: string
    picture: string
}

export const GoogleAuth = async(token: string) => {
    
}
