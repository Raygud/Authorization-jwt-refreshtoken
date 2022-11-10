import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

class ListModel extends Model { }

ListModel.init({
      
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
item: {
    type: DataTypes.CHAR,
    allowNull: true,
},
amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
}

},{
sequelize,
modelName: 'List',
freezeTableName: true,
underscored: true ,
createdAt: true,
updatedAt: true
})



export default ListModel