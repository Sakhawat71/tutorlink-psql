import status from "http-status";
import { AppError } from "../../errors/AppError";
import prisma from "../../utils/primsa";
import { SSLService } from "../SSL/ssl.service";
import { BookingStatus, PaymentStatus } from "@prisma/client";


const initPayment = async (bookingId: string) => {

    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            user: true
        }
    });

    if (!booking) {
        throw new Error("Booking not found");
    };

    const transactionId = `payment-${Date.now()}`;


    await prisma.payment.create({
        data: {
            bookingId: booking.id,
            transactionId,
            paymentMethod: "sslcommerz",
            amount: booking.price,
            status: 'PENDING',
        },
    });

    const initPaymentData = {
        amount: booking.price,
        transactionId,
        name: booking.user.name,
        email: booking.user.email,
        address: 'N/A',
        phoneNumber: '01711111111',
    };

    const result = await SSLService.initPayment(initPaymentData);
    return {
        paymentUrl: result.GatewayPageURL
    };
};

const validatePayment = async (query: any) => {

    if (!query?.tran_id) {
        throw new AppError(
            'Missing transaction ID',
            status.BAD_REQUEST
        );
    };

    const payment = await prisma.payment.findUnique({
        where: {
            transactionId: query.tran_id
        },
    });

    if (!payment) {
        throw new AppError(
            'Payment not found',
            status.BAD_REQUEST
        );
    };

    const updatedPayment = await prisma.$transaction(async (tx) => {

        const updatedPaymentData = await tx.payment.update({
            where: {
                transactionId: query.tran_id
            },
            data: {
                status: PaymentStatus.COMPLETED,
            }
        });

        await tx.booking.update({
            where: {
                id: updatedPaymentData.bookingId
            },
            data: {
                status: BookingStatus.CONFIRMED
            }
        });
        return updatedPaymentData;
    });

    return {
        // t_id: query.tran_id,
        message: "Payment success!",
        status: PaymentStatus.COMPLETED,
        data: updatedPayment
    }
};



export const paymentService = {
    initPayment,
    validatePayment
}