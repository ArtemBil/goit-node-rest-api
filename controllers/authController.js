import {getCurrentUser, login, logout, register, updateAvatar, verify, verifyToken} from "../services/authService.js";
import HttpError from "../helpers/HttpError.js";
import auth from "../middlewares/auth.js";
import authRouter from "../routes/authRouter.js";

export const registerUser = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await getCurrentUser(req.body);

    if (user) {
        throw HttpError(409, 'Email in use')
    }

    try {
        const user = await register(email, password);

        res.status(201).json({
            "user": {
                email: user.email,
                subscription: user.subscription,
                avatarURL: user.avatarURL,
            }
        });
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const { user, token } = await login(email, password);


    res.json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        }
    })
}

export const listUser = (req, res) => {
    const user = req.user;

    res.json({
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
    })
}

export const logoutUser = async (req, res) => {
    const {id} = req.user;
    await logout(id);

    res.status(204).json({});
}

export const updateAvatarUser = async (req, res, next) => {
    try {
        if (!req.file) {
            throw HttpError(400, 'No file uploaded');
        }

        const {id} = req.user;
        const avatarURL = await updateAvatar(id, req.file);

        res.status(200).json({
            avatarURL: avatarURL
        });
    } catch (error) {
        next(error);
    }
}

export const verifyUser = async (req, res) => {
    const {verificationToken} = req.params;
    await verifyToken(verificationToken);

    res.status(200).json({
        message: 'Verification successful'
    });
}

export const resendUserVerificationToken = async (req, res) => {
    const {email} = req.body;
    await verify(email);


    res.status(200).json({
        message: 'Verification email resent'
    });
}