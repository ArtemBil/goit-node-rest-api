import User from "../entities/users.js";

class UserRepository {
    async registerUser(email, password) {
        const newUserInstance = new User({ email });
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
}

export default new UserRepository();