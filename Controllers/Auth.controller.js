import UserModel from '../Models/User.model.js'

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
            const data = await UserModel.findOne({
                attributes:['uuid','Firstname','Lastname','Username' ,'Password','RefreshToken' ],
                where: {
                    [Op.or]: [
                        { Username: username },
                        { Email: username }]}        
            })

            if(data === null){
                return res.sendStatus(404)
                console.log("Data === NULL")
               }
               
               
            
               console.log(data.RefreshToken)
            bcrypt.compare(password, data.Password, (err,result) => {
                if(result){
                    UserModel.findOne(
                        { 
                          where: {uuid : data.uuid}
                      }).then(function (record) {
                
                        console.log(data.RefreshToken)
                        if(data.RefreshToken && data.RefreshToken != null){
                            console.log(data.RefreshToken)
                            console.log("Refresh token detected")
                        }
                        else{
                            console.log("No Refresh token detected.. generating refresh token..")
                            const GenerateRefreshToken = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (30 * 30),
                                data: {uuid: data.uuid},
                              }, process.env.REFRESH_KEY);
                              record.update(
                                { RefreshToken: GenerateRefreshToken},
                                { where: { uuid: data.uuid} }
                            );
                        }
                        
                      })
                    
                    const payload = {
                        uuid : data.uuid,
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
                    console.log("Password Comparison failed")
                }
            })
        }else{
            res.sendStatus(418)
        }

    }
    
    protected = async (req, res) =>{
            if(req.headers['authorization'] === undefined ){
                return res.sendStatus(404)
            }
            
            
        const Header = req.headers['authorization']
        const AccessToken = Header.substr(7,Header.length)
        
        jwt.verify(AccessToken, process.env.TOKEN_KEY, (err, data) => {
            if(err){
            switch(err.message) {
                case "invalid token":
                    console.log(err.message)
                   res.sendStatus(401)
                  break;
                case "jwt expired":
                    console.log(err.message)
                    penis()
                  break;
                }
              }
              else{
                console.log("no error")
                penis()
              }
              
        })
          
        async function penis(){
            console.log("Fetching refresh token")
            const Decoded = jwt.decode(AccessToken);
    const UserId = Decoded.data.uuid
    const User = await UserModel.findOne({
        where: { uuid: UserId },
            attributes: ["RefreshToken"],
    })
        if(!User){
            console.log("No such user")
            return res.sendStatus(401)
        }
        if(User.RefreshToken){
            console.log("Refresh token detected")
        jwt.verify(User.RefreshToken, process.env.REFRESH_KEY, (err, data) => {
            if(err){
                console.log(err.message)
            }
              
        })
            
        }
        else{
            console.log("No Refresh token detected, please authenticate again")
            return res.sendStatus(401)
        }
    }
    //       console.log("Penis")
    //       console.log(User.RefreshToken)
    //       const RefreshToken = User.RefreshToken


    //     if(requestToken){
        
    //     jwt.verify(requestToken, process.env.TOKEN_KEY, (err, data) => {
    //         if (!err) {
                
    //             res.sendStatus(200)
    //         } else {
    //             console.log(err.message)
    //             switch(err.message) {
    //                 case "invalid token":
    //                     res.sendStatus(400)
    //                   break;
    //                 case "jwt expired":
    //                     if(!RefreshToken) {
    //                     return res.sendStatus(400)}
    //                     jwt.verify(RefreshToken, process.env.REFRESH_KEY, (err, data) => {
    //                         if (!err) {
    //                             console.log("New token generated")
    //                             const payload = {
    //                                 uuid : data.uuid,
    //                                 Firstname : data.Firstname,
    //                                 Lastname : data.Lastname,
    //                                 Username : data.Username,
    //                                 Email : data.Email}
    //                             const token = jwt.sign({
    //                                 exp: Math.floor(Date.now() / 1000) + (10 * 10),
    //                                 data: payload,
    //                               }, process.env.TOKEN_KEY);
    //                             return res.json({ token : token})
    //                             next()
    //                         } else {
    //                             console.log(err.message)
    //                             switch(err.message) {
    //                                 case "invalid token":
    //                                     res.sendStatus(400)
    //                                   break;
    //                                 case "RefreshToken expired":
                                        
    //                                   break;
    //                                 default:
    //                                   // code block
    //                               }
                                
    //                         }
    //                     })
    //                   break;
    //                 default:
    //                   // code block
    //               }
                
    //         }
    //     })}
     }
}

export {AuthController}