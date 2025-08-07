import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.getUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    });
});


export const userControllers = {
    getUser
};