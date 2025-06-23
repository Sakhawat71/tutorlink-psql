import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import status from "http-status";
import configs from "../../configs";


// register
const registerUser = async (payLoad: IUser) => {

    const { email } = payLoad;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new AppError(
            "User with this email already exists",
            status.CONFLICT, 
        );
    };
    return await UserModel.create(payLoad);
};

// login
const loginUser = async (payLoad: ILoginUser) => {

    const { email, password } = payLoad;

    const user = await UserModel.findOne({ email });
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
            "Invalid credentials",
            status.UNAUTHORIZED,
        );
    };

    const JwtPayload = {
        email: user.email,
        name : user.name,
        role: user.role,
        id: user._id,
    };

    // Create jwt access token
    const accessToken = jwt.sign(
        JwtPayload,
        configs.accessTokenSecret as string,
        {
            expiresIn: configs.accessTokenExpiry as any,
        }
    );

    return {
        token: accessToken
    }
};

export const authService = {
    registerUser,
    loginUser
};