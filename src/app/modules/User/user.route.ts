import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.get("/me", userControllers.getUser);

export const userRoutes = router;