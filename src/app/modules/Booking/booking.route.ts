import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get(
    "/all-bookings",
    bookingControllers.getAllBookings
);

router.get(
    "/:id",
    bookingControllers.getBookingById
);

router.post(
    "/create-booking",
    bookingControllers.createBooking
);

router.patch(
    "/:id",
    bookingControllers.updateBooking
);

export const bookingRoute = router;