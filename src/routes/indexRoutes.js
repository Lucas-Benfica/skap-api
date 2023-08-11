import { Router } from "express";
import carsRouter from "./carsRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use(userRouter);
router.use(carsRouter);

export default router;