export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface IBooking {
    id?: string;
    studentId: string;
    tutorId: string;
    selectedSlotId: string;

    date: Date;
    duration: number;
    price: number;

    status: BookingStatus;

    payment?: any;
    review?: any;

    createdAt?: Date;
    updatedAt?: Date;
}
