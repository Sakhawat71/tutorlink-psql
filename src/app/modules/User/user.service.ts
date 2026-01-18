import prisma from "../../utils/primsa"


const getUser = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
};

const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id
        },
        include: {
            tutor: true,
            student:true,
        },
    });
};


export const UserServices = {
    getUser,
    getUserById
};