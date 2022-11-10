import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

class UserModel extends Model { }

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Phone: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ProfilePicture: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    OneTimePassword: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    RefreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'USERS',
    freezeTableName: true,
    underscored: false,
    createdAt: true,
    updatedAt: true,
    hooks: {
        beforeCreate: async (user, options) => {
            user.Password = await createHash(user.Password)
        },
        
        beforeUpdate: async (user, options) => {
            if(user.OneTimePassword != null){
                user.OneTimePassword = await createHash(user.OneTimePassword)
            }
            if(user.Password === null){
                return
            }
            user.Password = await createHash(user.Password)
        }
    }
})

/**
 * Funktion that encrypts a string
 * @param {String} string 
 * @returns Hashed string
 */

const createHash = async string => {
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(string, salt);
    return hashedString;
}

export default UserModel