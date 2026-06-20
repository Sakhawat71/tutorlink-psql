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


// const getAllTutors = async (filters: any, options: any) => {
//     const { searchTerm, ...filterData } = filters;
//     const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

//     const andConditions: Prisma.TutorWhereInput[] = [];

//     if (searchTerm) {
//         andConditions.push({
//             OR: [
//                 {
//                     name: {
//                         contains: searchTerm,
//                         mode: 'insensitive',
//                     },
//                 },
//                 {
//                     subjectList: {
//                         hasSome: [searchTerm],
//                     },
//                 },
//                 {
//                     bio: {
//                         contains: searchTerm,
//                         mode: 'insensitive',
//                     },
//                 },
//             ],
//         });
//     };


//     // Filter Logic
//     if (filterData.name) {
//         andConditions.push({
//             name: {
//                 contains: filterData.name,
//                 mode: 'insensitive',
//             },
//         });
//     }

//     if (filterData.hourlyRate) {
//         andConditions.push({
//             hourlyRate: {
//                 equals: Number(filterData.hourlyRate),
//             },
//         });
//     }

//     if (filterData.experience) {
//         andConditions.push({
//             experience: {
//                 equals: Number(filterData.experience),
//             },
//         });
//     }

//     if (filterData.location) {
//         andConditions.push({
//             location: filterData.location,
//         });
//     }

//     const whereConditions: Prisma.TutorWhereInput =
//         andConditions.length > 0 ? { AND: andConditions } : {};

//     const result = await prisma.tutor.findMany({
//         where: whereConditions,
//         skip,
//         take: limit,
//         orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
//         include: {
//             availability: true,
//             user: true,
//             reviews: true,
//         },
//     });

//     const total = await prisma.tutor.count({
//         where: whereConditions,
//     });

//     return {
//         meta: {
//             page,
//             limit,
//             skip,
//             total,
//         },
//         result,
//     };
// };



const getAllTutors = async (filters: any, options: any) => {
    const { searchTerm, subjects, days, maxPrice, ...filterData } = filters;
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
    // Range filter for the price slider ("up to $X/hr"), separate from the
    // exact-match hourlyRate filter above.
    if (maxPrice) {
        andConditions.push({
            hourlyRate: {
                lte: Number(maxPrice),
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
    // Multi-subject filter: matches tutors who teach ANY of the selected subjects.
    // Expects subjects as a comma-separated string from query params, e.g. "Math,English".
    if (subjects) {
        const subjectArray = Array.isArray(subjects) ? subjects : String(subjects).split(",").filter(Boolean);
        if (subjectArray.length > 0) {
            andConditions.push({
                subjectList: {
                    hasSome: subjectArray,
                },
            });
        }
    }
    // Day-of-week availability filter: matches tutors with at least one
    // availability slot on ANY of the selected days.
    // Expects days as a comma-separated string, e.g. "Monday,Friday".
    if (days) {
        const dayArray = Array.isArray(days) ? days : String(days).split(",").filter(Boolean);
        if (dayArray.length > 0) {
            andConditions.push({
                availability: {
                    some: {
                        day: {
                            in: dayArray,
                        },
                    },
                },
            });
        }
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
            totalPages: Math.ceil(total / limit),
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