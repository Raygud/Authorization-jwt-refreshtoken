import UserModel from '../Models/User.model.js'
import InteresoUser from '../Models/InteresoUser.model.js'

import dotevn from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotevn.config()
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

class AuthController{
    constructor(){
        console.log("Running authentification")
    }
    
    login = async (req, res) => {
        console.log(req.body);
        const {username, password} = req.body;

        if(username && password){
            const data = await InteresoUser.findOne({
                attributes:['id','Firstname','Lastname','Username' ,'Password'],
                where: {
                    [Op.or]: [
                        { Username: username },
                        { Email: username }]}        
            })
            
            console.log(data)

            if(data === null){
                return res.sendStatus(404)
               }
               console.log(data.id)
               
               
            

            bcrypt.compare(password, data.Password, (err,result) => {
                if(result){

                    UserModel.findOne(
                        { 
                          where: {id : data.id}
                      }).then(function (record) {
                        
                        const GenerateRefreshToken = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (30 * 30),
                            data: {id: data.id},
                          }, process.env.REFRESH_KEY);
                        record.update({RefreshToken: GenerateRefreshToken});
                      })
                    
                    const payload = {
                        Id : data.id,
                        Firstname : data.Firstname,
                        Lastname : data.Lastname,
                        Username : data.Username,
                        Email : data.Email}
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (10 * 10),
                        data: payload,
                      }, process.env.TOKEN_KEY);
                    return res.json({ token : token})
                }else{
                    res.sendStatus(401)
                }
            })
        }else{
            res.sendStatus(418)
        }

    }
    
    protected = async (req, res) =>{
        const User = await UserModel.findOne({
            where: { id: 4 },
                attributes: ["RefreshToken"],
          });
          console.log(User.RefreshToken)
          const RefreshToken = User.RefreshToken

        console.log(req.body);
        const {requestToken} = req.body;

        if(requestToken){
        
        jwt.verify(requestToken, process.env.TOKEN_KEY, (err, data) => {
            if (!err) {
                
                res.sendStatus(200)
            } else {
                console.log(err.message)
                switch(err.message) {
                    case "invalid token":
                        res.sendStatus(400)
                      break;
                    case "jwt expired":
                        if(!RefreshToken) {
                        return res.sendStatus(400)}
                        jwt.verify(RefreshToken, process.env.REFRESH_KEY, (err, data) => {
                            if (!err) {
                                console.log("New token generated")
                                const payload = {
                                    Id : data.id,
                                    Firstname : data.Firstname,
                                    Lastname : data.Lastname,
                                    Username : data.Username,
                                    Email : data.Email}
                                const token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (10 * 10),
                                    data: payload,
                                  }, process.env.TOKEN_KEY);
                                return res.json({ token : token})
                                next()
                            } else {
                                console.log(err.message)
                                switch(err.message) {
                                    case "invalid token":
                                        res.sendStatus(400)
                                      break;
                                    case "RefreshToken expired":
                                        
                                      break;
                                    default:
                                      // code block
                                  }
                                
                            }
                        })
                      break;
                    default:
                      // code block
                  }
                
            }
        })}
    }
}

export {AuthController}