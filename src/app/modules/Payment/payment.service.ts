import status from "http-status";
import { AppError } from "../../errors/AppError";
import prisma from "../../utils/primsa";
import { SSLService } from "../SSL/ssl.service";
import { PaymentStatus } from "@prisma/client";


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
        }
    });

    if (!payment) {
        throw new AppError(
            'Payment not found',
            status.BAD_REQUEST
        );
    };

    // const isPaid = await prisma.payment.findFirst({
    //     where: {
    //         transactionId: query.tran_id,
    //         status: PaymentStatus.PAID
    //     }
    // });
    // if (isPaid) {
    //     throw new AppError(
    //         'Already paid',
    //         status.BAD_REQUEST
    //     );
    // };


    await prisma.$transaction(async (tx) => {
        const updatedPaymentData = await tx.payment.update({
            where: {
                transactionId: query.tran_id
            },
            data: {
                status: PaymentStatus.COMPLETED,
                paymentGatewayData: query
            }
        });

        await tx.account.update({
            where: {
                id: updatedPaymentData.accountId
            },
            data: {
                isPremium: true
            }
        });
    });

    return {
        message: "Payment success!"
    }
};



export const paymentService = {
    initPayment,
}