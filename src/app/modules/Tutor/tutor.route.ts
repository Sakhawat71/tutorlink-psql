import { Router } from "express";
import { TutorController } from "./tutor.controller";


const router = Router();

router.get(
    "/",
    TutorController.getAllTutors
);

router.get(
    "/:id",
    TutorController.getTutorById
);

router.post(
    "/",
    TutorController.createTutor
);

router.patch(
    "/:id",
    TutorController.updateTutor
);

router.delete(
    "/:id",
    TutorController.deleteTutorById
);

export const tutorRoute = router;