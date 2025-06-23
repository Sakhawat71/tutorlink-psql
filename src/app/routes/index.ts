import { Router } from "express";
import { IRoute } from "../types/router.type";
import { authRoute } from "../modules/Auth/auth.route";


const router = Router();
const routersModule: IRoute[] = [
    {
        path: '/auth',
        route: authRoute,
    },
];

routersModule.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;