import prisma from "../../utils/primsa"


const getUser = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
};


export const UserServices = {
    getUser
};