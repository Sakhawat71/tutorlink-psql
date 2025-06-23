import { Router } from "express";
import { IRoute } from "../types/router.type";
import { authRoute } from "../modules/Auth/auth.route";
import { tutorRoute } from "../modules/Tutor/tutor.route";


const router = Router();
const routersModule: IRoute[] = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/tutor',
        route: tutorRoute,
    },
];

routersModule.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;