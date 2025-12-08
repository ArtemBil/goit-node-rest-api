import User from "../entities/users.js";

class UserRepository {
    async registerUser(email, password, avatarURL) {
        const newUserInstance = new User({ email, avatarURL });
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
}

export default new UserRepository();