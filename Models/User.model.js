import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import bcrypt from 'bcrypt'


class UserModel extends Model {}

UserModel.init({
    uuid: { 
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Firstname: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    
    DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
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
        allowNull: false
    },
    City: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    JobTitle: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    ProfilePicture: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    RefreshToken: {
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
            console.log("Running update..")

            if(user.OneTimePassword != null){
                user.OneTimePassword = await createHash(user.OneTimePassword)
            }
            const CompairPasswords = user._previousDataValues.Password === user.dataValues.Password
            console.log(CompairPasswords)
            if(user.Password === null || CompairPasswords){
                
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