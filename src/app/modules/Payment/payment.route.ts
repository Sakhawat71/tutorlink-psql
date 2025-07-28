import { Router } from "express";
import { paymentController } from "./payment.controller";


const router = Router();

router.post(
    "/init-payment/:id",
    paymentController.initPayment
);

router.get(
    "/validate-payment",
    paymentController.validatePayment
)

export const paymentRoutes = router;