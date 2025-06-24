import prisma from "../../utils/primsa"


const createTutor = async (payload: any) => {
    const { availability, userId, ...rest } = payload;

    const [createdTutor] = await prisma.$transaction([
        prisma.tutor.create({
            data: {
                ...rest,
                userId,
                availability: {
                    create: availability,
                },
            },
        }),
        prisma.user.update({
            where: { id: userId },
            data: {
                isCompleteProfile: true,
            },
        }),
    ]);

    return createdTutor;
};




const getAllTutors = async () => {
    return prisma.tutor.findMany({
        include: {
            availability: true,
        }
    });
};

const getTutorById = async (id: string) => {
    return prisma.tutor.findUnique({
        where: {
            id
        },
        include: {
            availability: true,
        }
    });
};

const updateTutor = async (
    id: string,
    payload: any
) => {
    return prisma.tutor.update({
        where: {
            id
        },
        data: {
            ...payload
        }
    });
}

const deleteTutorById = async (
    id: string
) => {
    return prisma.tutor.delete({
        where: {
            id
        }
    });
};


export const TutorService = {
    createTutor,
    getAllTutors,
    getTutorById,
    updateTutor,
    deleteTutorById,
};