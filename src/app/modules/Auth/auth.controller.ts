import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

// REGISTER CONTROLLER
const register = catchAsync(async (req, res) => {
    const result = await authService.registerUser(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
    })
});

// LOGIN CONTROLLER
const login = catchAsync(async (req, res) => {
    const result = await authService.loginUser(req.body);
    // final response
    return sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Login successful',
        data: result.token,
        // data: result
    })
});

export const userController = {
    register,
    login
};
