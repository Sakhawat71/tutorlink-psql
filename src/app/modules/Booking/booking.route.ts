import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get(
    "/",
    bookingControllers.getAllBookings
);

router.get(
    "/:id",
    bookingControllers.getBookingById
);

router.get(
    "/my-booking/:studentId",
    bookingControllers.myBooking
);

router.get(
    '/email/:email',
    bookingControllers.getBookingByEmail
)

router.post(
    "/create-booking",
    bookingControllers.createBooking
);

router.patch(
    "/:id",
    bookingControllers.updateBooking
);

export const bookingRoute = router;