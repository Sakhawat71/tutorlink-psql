import { Router } from "express";
import { userController } from "./auth.controller";
const route = Router();

route.post(
    '/register',
    userController.register
);

route.post(
    '/login',
    userController.login
);

export const authRoute = route;