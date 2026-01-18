import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../utils/peginationHelper";
import prisma from "../../utils/primsa"


const createTutor = async (payload: any) => {
    const { availability, userId, ...rest } = payload;

    const existingTutor = await prisma.tutor.findUnique({ where: { userId } });
    if (existingTutor) {
        throw new Error("You already have a tutor profile. Please edit it instead.");
    }

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


const getAllTutors = async (filters: any, options: any) => {
    const { searchTerm, ...filterData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    const andConditions: Prisma.TutorWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    subjectList: {
                        hasSome: [searchTerm],
                    },
                },
                {
                    bio: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    };


    // Filter Logic
    if (filterData.name) {
        andConditions.push({
            name: {
                contains: filterData.name,
                mode: 'insensitive',
            },
        });
    }

    if (filterData.hourlyRate) {
        andConditions.push({
            hourlyRate: {
                equals: Number(filterData.hourlyRate),
            },
        });
    }

    if (filterData.experience) {
        andConditions.push({
            experience: {
                equals: Number(filterData.experience),
            },
        });
    }

    if (filterData.location) {
        andConditions.push({
            location: filterData.location,
        });
    }

    const whereConditions: Prisma.TutorWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.tutor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        include: {
            availability: true,
            user: true,
            reviews: true,
        },
    });

    const total = await prisma.tutor.count({
        where: whereConditions,
    });

    return {
        meta: {
            page,
            limit,
            skip,
            total,
        },
        result,
    };
};

const getTutorById = async (id: string) => {
    return prisma.tutor.findUnique({
        where: {
            id
        },
        include: {
            availability: true,
            user: true,
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