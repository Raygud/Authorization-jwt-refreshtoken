import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'


class RoutesModel extends Model { }

RoutesModel.init({ 
    
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
name: {
    type: DataTypes.CHAR,
    allowNull: true,
},
grade: {
    type: DataTypes.CHAR,
    allowNull: true,

},
rate: {
    type: DataTypes.INTEGER,
    allowNull: true,
},
send: {
    type: DataTypes.INTEGER,
    allowNull: true,
},
description: {
    type: DataTypes.CHAR,
    allowNull: true,
},
image: {
    type: DataTypes.CHAR,
    allowNull: true,
},
lat: {
    type: DataTypes.DOUBLE,
    allowNull: true,
},
lng: {
    type: DataTypes.DOUBLE,
    allowNull: true,
}

},{
sequelize,
modelName: 'Routes',
freezeTableName: true,
underscored: true ,
createdAt: true,
updatedAt: true
})


export default RoutesModel