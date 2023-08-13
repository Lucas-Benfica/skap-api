import { Router } from "express";
import { getIsFavorite, postAddFavorite, postRemoveFavorite, signIn, signUp } from "../controllers/userController.js";
import { validateAuth } from "../middlewares/validateAuthorization.js";
import { validateEmailCreation } from "../middlewares/validateEmailCreation.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSignUp, schemaSignIn } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(schemaSignUp), validateEmailCreation, signUp);
userRouter.post('/signin', validateSchema(schemaSignIn), validateLogin, signIn);
//userRouter.get('/user', validateAuth);
userRouter.post('/favorites/add', validateAuth, postAddFavorite);
userRouter.post('/favorites/remove', validateAuth, postRemoveFavorite);
userRouter.get('/favorite/:id', validateAuth, getIsFavorite);



export default userRouter;