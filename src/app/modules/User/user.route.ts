import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.get("/:id", userControllers.getUser);

export const userRoutes = router;