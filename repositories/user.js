import User from "../entities/users.js";
import {nanoid} from "nanoid";

class UserRepository {
    async registerUser(email, password, avatarURL) {
        const verificationToken = nanoid();
        const newUserInstance = new User({ email, avatarURL, verificationToken });
        await newUserInstance.setPassword(password);

        const newUser  = await newUserInstance.save({ returning: true });
        return newUser;
    }

    findById(id) {
        return User.findByPk(id);
    }

    findUserByEmail(email) {
        return User.findOne({where: {email}});
    }

    async updateAvatarURL(id, avatarURL) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        user.avatarURL = avatarURL;
        await user.save();
        return user;
    }

    async findByVerificationToken(verificationToken) {
        return User.findOne({where: {verificationToken}});
    }
}

export default new UserRepository();