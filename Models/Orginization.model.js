import { sequelize } from '../Config/db.sequelize.js'
import {DataTypes} from 'sequelize'
import {Model} from 'sequelize'


class OrginizationModel extends Model {}

OrginizationModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    Address: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    Zip: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    City: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    Country: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    Phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Email: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    
},{
    sequelize,
    modelName: 'Orginization',
    freezeTableName: true,
    underscored: false ,
    createdAt: true,
    updatedAt: true
})

export default OrginizationModel