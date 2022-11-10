import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config();

let db = mysql.createConnection({
    host: process.env.Host,
    port: process.env.DB_Port,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database
});

db.connect()

export default db