import userRepository from "../repositories/user.js";
import HttpError from "../helpers/HttpError.js";
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export async function register(email, password) {
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'identicon' }, true);
    const user = await userRepository.registerUser(email, password, avatarURL);
    return user;
}

export async function login(email, password) {
    const user = await userRepository.findUserByEmail(email);
    const validPassword = user && await user.validPassword(password);

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

export async function updateAvatar(userId, file) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const tempPath = file.path;
    const publicAvatarsDir = path.join(__dirname, '../public/avatars');
    
    // Ensure public/avatars directory exists
    await fs.mkdir(publicAvatarsDir, { recursive: true });
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = `${userId}-${uniqueSuffix}${ext}`;
    const newPath = path.join(publicAvatarsDir, filename);
    
    await fs.rename(tempPath, newPath);
    
    const avatarURL = `/avatars/${filename}`;
    
    const user = await userRepository.updateAvatarURL(userId, avatarURL);
    
    if (!user) {
        await fs.unlink(newPath).catch(() => {});
        throw HttpError(404, 'User not found');
    }
    
    return avatarURL;
}