import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import { signToken } from "./jwt.service";
import { LoginInput, SignUpInput } from "../types/auth";

export const signUp = async({email, password, confirmPassword}: SignUpInput) => {
    if(!email || !password || !confirmPassword) {
        throw new Error('Please enter email and password')
    }

    if (password !== confirmPassword) {
        throw new Error('Password does not match')
    }

    const strongPassword = password.length >= 8 
                            && /[0-9]/.test(password) 
                            && /[a-z]/.test(password) 
                            && /[A-Z]/.test(password)

    if (!strongPassword) {
        throw new Error('Password is not strong')
    }

    const user = await User.findOne({ email })

    if (user) {
        throw new Error('Email has existed')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        email,
        password: hashPassword,
        name: '',
        avatar: '',
        role: 'user',
        isActive: true
    })

    const token = signToken({
        _id: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        avatar: newUser.avatar

    })

    return {
        token,
        user: {
            _id: newUser._id.toString(),
            email: newUser.email,
            role: newUser.role
        }
    }
}

export const signIn = async({email, password}: LoginInput) => {
    if(!email || !password) {
        throw new Error('Please enter email and password')
    }

    const user  = await User.findOne({ email })

    if (!user) {
        throw new Error('Email does not exist!')
    }

    if (!user.isActive) {
        throw new Error('The account has been banned. Please contact the admin to access the site')
    }

    if (!user.password) {
        throw new Error('The account has been registered by Google. Please login with Google')
    }

    const passMatch = await bcrypt.compare(password, user.password)

    if (!passMatch) {
        throw new Error('The password incorrect. Please try again')
    }

    const token = signToken({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar
    })

    return {
        token,
        user: {
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
            avatar: user.avatar
        }
    }
}