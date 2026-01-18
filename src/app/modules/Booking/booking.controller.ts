import status from "http-status";
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBooking(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Booking created successfully",
        data: result
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookings();
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    });
});


const getBookingById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingServices.getBookingById(id);
    if (!result) {
        return sendResponse(res, {
            statusCode: status.NOT_FOUND,
            success: false,
            message: "Booking not found",
        });
    }
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result
    });
});


const myBooking = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await BookingServices.myBooking(studentId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    });
});

const updateBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingServices.updateBooking(id, req.body);
    if (!result) {
        return sendResponse(res, {
            statusCode: status.NOT_FOUND,
            success: false,
            message: "Booking not found",
        });
    }
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Booking updated successfully",
        data: result
    });
});


const getBookingByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await BookingServices.getBookingByEmail(email);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result
    })
});

export const bookingControllers = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    myBooking,
    getBookingByEmail,
};