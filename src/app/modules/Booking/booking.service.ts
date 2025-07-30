import prisma from "../../utils/primsa";
import { IBooking } from "./booking.interface";


const createBooking = async (
    payload: IBooking
) => {
    const createBooking = await prisma.booking.create({
        data: payload
    });
    return createBooking;
};

const getAllBookings = async () => {
    return prisma.booking.findMany();
}

const getBookingById = async (
    id: string
) => {
    return prisma.booking.findUnique({
        where: {
            id
        }
    });
};

const myBooking = async (id: string) => {
    return prisma.booking.findMany({
        where: {
            studentId: id
        }
    });
};

// const getBookingByEmail = async (
//     email: string
// ) => {
//     return prisma.booking.findMany({
//         where :{
//             OR : [
//                 {
//                     userEmail: email
//                 },
//                 {
//                     tutorEmail: email
//                 }
//             ]
//         }

//     });
// }

const updateBooking = async (
    id: string,
    payload: any
) => {
    return prisma.booking.update({
        where: {
            id
        },
        data: payload
    })
};

export const BookingServices = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    myBooking
};