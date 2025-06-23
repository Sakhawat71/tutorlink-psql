import prisma from "../../utils/primsa"


const createTutor = async (payload: any) => {
    return prisma.tutor.create({
        data: {
            ...payload
        }
    });
};

const getAllTutors = async () => {
    return prisma.tutor.findMany();
};

const getTutorById = async (id: string) => {
    return prisma.tutor.findUnique({
        where: {
            id
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