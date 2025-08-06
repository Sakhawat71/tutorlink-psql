import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getUser = catchAsync(async (req, res) => {

    console.log(req.user);
    const { studentId } = req.params;
    // const result = await BookingServices.myBooking(studentId);
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