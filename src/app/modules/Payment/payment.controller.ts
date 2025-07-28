import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const initPayment = catchAsync(async (req, res) => {
    const result = await paymentService.initPayment(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Payment initialized successfully",
        data: result,
    })
});

export const paymentController = {
    initPayment,
};