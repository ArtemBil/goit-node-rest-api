import express from "express";
import {registerUser, loginUser, listUser, logoutUser, updateAvatarUser} from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/authSchemas.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), registerUser);
authRouter.post('/login', validateBody(loginSchema), loginUser);
authRouter.post('/logout', auth, logoutUser);
authRouter.get('/current', auth, listUser);
authRouter.patch('/avatars', auth, upload.single('avatar'), updateAvatarUser);

export default authRouter;