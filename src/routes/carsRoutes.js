import { Router } from "express";
import { confirmSale, getCarById, getCarBySearch, getCarList, getCarRanking, postCreateCar } from "../controllers/carsController.js";
import { validateAuth } from "../middlewares/validateAuthorization.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { carsSchema } from "../schemas/carsSchemas.js";

const carsRouter = Router();

carsRouter.get('/cars', getCarList);
carsRouter.get('/cars/:id', getCarById);
carsRouter.post('/cars', validateSchema(carsSchema), validateAuth, postCreateCar);
carsRouter.get('/ranking', getCarRanking);
carsRouter.get('/search', getCarBySearch);
carsRouter.post('/cars-user/:id', validateAuth, confirmSale);
export default carsRouter;