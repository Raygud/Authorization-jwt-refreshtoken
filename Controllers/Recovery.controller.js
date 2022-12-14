import UserModel from '../Models/User.model.js'
import nodemailer from 'nodemailer'
import dotevn from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotevn.config()

class RecoveryController{
    constructor(){
        console.log("Running authentification")
    }
    recovery = async (req, res) => {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
        console.log(req.body);
        const {username} = req.body;
        let OTP = getRandomInt(1000,9999);
        console.log(username)

        if(username){
            const data = await UserModel.findOne({
                attributes:['id','Password','Firstname'],
                where: {Email: username}
                
            })

            console.log(data.Firstname)

            const model = await UserModel.update({ OneTimePassword : OTP },{ where: {Email: username}});


            setTimeout(() => {
              OTP = null;
              UserModel.update({ OneTimePassword : OTP },{ where: {Email: username}}); }, 600000);

            if(data === null){
                return res.sendStatus(404)
               }

               var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                  user: 'Runigud@hotmail.com',
                  pass: 'Djonaigeilgota30'
                }
              });
              
              var mailOptions = {
                from: 'Runigud@hotmail.com',
                to: 'Runigudmundarson@hotmail.com',
                subject: 'Password Recovery',
                html: `<html><body><p> 
                Hey ${data.Firstname}, you recently requested a one-time use password. In order to complete your login, please use the following as your password.</p> <input type="text" value=${OTP} style="text-align: center; font-size: 4vw;" readonly> <p>Please be aware that this password will expire in approximately 10 minutes. If you did not request a one-time password, you can ignore this message as it will expire soon.</p></body></html>`
                
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.sendStatus(200)
                }
              });
            
            }}

            
}

export {RecoveryController}