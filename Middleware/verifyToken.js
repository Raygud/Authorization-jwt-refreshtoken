import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { request } from 'express'
dotenv.config()

const verifyToken = (req, res, next) => {
        const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const requestToken = bearerHeader.split(' ')[1]
        jwt.verify(requestToken, process.env.TOKEN_KEY, (err, data) => {
            if (!err) {
                
                next()
            } else {
                console.log(err.message)
                switch(err.message) {
                    case "invalid token":
                        res.sendStatus(400)
                      break;
                    case "jwt expired":
                        res.sendStatus(401)
                      break;
                    default:
                      // code block
                  }
                
            }
        })
    } else {
        console.log("Weee")
        res.sendStatus(401)
    }

}
export default verifyToken;




