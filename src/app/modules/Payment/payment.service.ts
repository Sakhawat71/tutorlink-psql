import prisma from "../../utils/primsa";
import { SSLService } from "../SSL/ssl.service";


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
            paymentMethod : "sslcommerz",
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

export const paymentService = {
    initPayment,
}