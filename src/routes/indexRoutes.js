import { Router } from "express";
//import userRouter from "./userRoutes.js";

const router = Router();

router.use(userRouter);

export default router;