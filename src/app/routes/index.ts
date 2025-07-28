import { Router } from "express";
import { IRoute } from "../types/router.type";
import { authRoute } from "../modules/Auth/auth.route";
import { tutorRoute } from "../modules/Tutor/tutor.route";
import { bookingRoute } from "../modules/Booking/booking.route";
import { paymentRoutes } from "../modules/Payment/payment.route";


const router = Router();
const routersModule: IRoute[] = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/tutor',
        route: tutorRoute,
    },
    {
        path: '/booking',
        route: bookingRoute,
    },
    {
        path: '/payment',
        route: paymentRoutes,
    }
];

routersModule.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;