import { Router } from "express";
import { paymentController } from "./payment.controller";


const router = Router();

router.post(
    "/init-payment/:id",
    paymentController.initPayment
)

export const paymentRoutes = router;