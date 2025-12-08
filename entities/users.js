import sequelize from "../db/sequelize.js";
import {DataTypes, Model} from "sequelize";
import bcrypt from 'bcrypt';

class User extends Model {
    async setPassword(value) {
        const hashPassword = await bcrypt.hash(value, 10);

        this.setDataValue('password', hashPassword);
    }

    async validPassword(password) {
        return await bcrypt.compare(password, this.getDataValue('password'));
    }
}

User.init(
    {
        password: {
            type: DataTypes.STRING,
            required: [true, 'Set password for user'],
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'user',
    }
)

export default User;

