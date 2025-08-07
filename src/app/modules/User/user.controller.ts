import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getUser = catchAsync(async (req, res) => {
    const { id } = req.params;

    
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Bookings retrieved successfully",
        // data: result
    });
});


export const userControllers = {
    getUser
};