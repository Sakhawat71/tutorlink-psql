import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TutorService } from "./tutor.service";
import pickQuery from "../../utils/pickQuery";
import { tutorFilterableFields, tutorPaginationFields } from "./tutor.constant";


const getAllTutors = catchAsync(async (req, res) => {

    const filters = pickQuery(req.query, tutorFilterableFields);
    const options = pickQuery(req.query, tutorPaginationFields);


    const tutors = await TutorService.getAllTutors(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Tutors retrieved successfully",
        data: tutors,
    });
});


const createTutor = catchAsync(async (req, res) => {
    const tutor = await TutorService.createTutor(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Tutor created successfully",
        data: tutor,
    });
});


const getTutorById = catchAsync(async (req, res) => {
    const tutor = await TutorService.getTutorById(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Tutor retrieved successfully",
        data: tutor,
    });
});

const updateTutor = catchAsync(async (req, res) => {
    const tutors = await TutorService.updateTutor(req.params.id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Tutors retrieved successfully",
        data: tutors,
    });
});

const deleteTutorById = catchAsync(async (req, res) => {
    await TutorService.deleteTutorById(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Tutor deleted successfully",
        data: null
    });
});


export const TutorController = {
    createTutor,
    getAllTutors,
    getTutorById,
    updateTutor,
    deleteTutorById
};