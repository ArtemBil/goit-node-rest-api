import {getCurrentUser, login, logout, register} from "../services/authService.js";
import HttpError from "../helpers/HttpError.js";

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
        }
    })
}

export const listUser = (req, res) => {
    const user = req.user;

    res.json({
        email: user.email,
        subscription: user.subscription,
    })
}

export const logoutUser = async (req, res) => {
    const {id} = req.user;
    await logout(id);

    res.status(204).json({});
}