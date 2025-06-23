import { ILoginUser, IRegisterUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import status from "http-status";
import configs from "../../configs";
import prisma from "../../utils/primsa";
import generateToken from "../../utils/generateToken";


// register
const registerUser = async (payload: IRegisterUser) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email,
        }
    })
    if (existingUser) {
        throw new AppError(
            "User with this email already exists",
            status.CONFLICT,
        );
    };

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
        }
    })
};

// login
const loginUser = async (payload: ILoginUser) => {

    const { email, password } = payload;
    const userData = await prisma.user.findUnique({
        where: {
            email: payload.email,
        }
    });
    if (!userData) {
        throw new AppError(
            "user not found",
            status.NOT_FOUND,
        );
    };


    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (!user) {
        throw new AppError(
            "Invalid credentials",
            status.NOT_FOUND,
        );
    };

    // Check -> if user is Blocked
    if (user.isBlocked) {
        throw new AppError(
            "User is Blocked",
            status.BAD_REQUEST,
        );
    };

    // Check if password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(
            "Invalid password",
            status.UNAUTHORIZED,
        );
    };

    const JwtPayload = {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user.id,
    };

    // Create jwt access token
    const accessToken = generateToken(
        JwtPayload,
        configs.jwt.jwt_secret as string,
        configs.jwt.expiresin as string
    );

    return {
        token: accessToken
    }
};


export const authService = {
    registerUser,
    loginUser
};