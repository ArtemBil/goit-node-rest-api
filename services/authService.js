import userRepository from "../repositories/user.js";
import HttpError from "../helpers/HttpError.js";
import jwt from 'jsonwebtoken';

export async function register(email, password) {
    const user = await userRepository.registerUser(email, password);
    return user;
}

export async function login(email, password) {
    const user = await userRepository.findUserByEmail(email);
    const validPassword = await user.validPassword(password);

    if (!user || !validPassword) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    user.token = token;
    await user.save();

    return {
        user,
        token
    }
}

export async function logout(id) {
    const user = await userRepository.findById(id);
    user.token = null;
    await user.save();
}

export async function getCurrentUser(payload) {
    const {email} = payload;
    const user = await userRepository.findUserByEmail(email);

    return user;
}
