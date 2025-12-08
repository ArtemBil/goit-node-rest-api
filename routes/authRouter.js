import express from "express";
import {
    registerUser,
    loginUser,
    listUser,
    logoutUser,
    updateAvatarUser,
    verifyUser, resendUserVerificationToken
} from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema, verificationSchema} from "../schemas/authSchemas.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.get('/current', auth, listUser);
authRouter.get('/verify/:verificationToken', verifyUser);
authRouter.post('/verify', validateBody(verificationSchema), resendUserVerificationToken);
authRouter.post('/register', validateBody(registerSchema), registerUser);
authRouter.post('/login', validateBody(loginSchema), loginUser);
authRouter.post('/logout', auth, logoutUser);
authRouter.patch('/avatars', auth, upload.single('avatar'), updateAvatarUser);

export default authRouter;