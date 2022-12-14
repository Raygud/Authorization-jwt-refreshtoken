import {Sequelize} from 'sequelize'
import dotevn from 'dotenv'
dotevn.config()

const sequelize = new Sequelize(
    process.env.Database,
    process.env.User,
    process.env.Password,
    {
        host: process.env.Host,
        dialect: 'mysql'
    }
)

export {sequelize}