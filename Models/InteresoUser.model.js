import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'


class InteresoUserModel extends Model {}

InteresoUserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    Email: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Firstname: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    Lastname: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    
    DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    
    Phone: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    Gender: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    Country: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    City: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    JobTitle: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    ProfilePicture: {
        type: DataTypes.CHAR,
        allowNull: true
    },

},{
    sequelize,
    modelName: 'InteresoUsers',
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


export default InteresoUserModel