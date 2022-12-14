import UserModel from '../Models/User.model.js'

import dotevn from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotevn.config()
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

class AuthController {
    constructor() {
        console.log("Running authentification")
    }


    login = async (req, res) => {

        const token = req.cookies.token;
        console.log(token)
        console.log(req);
        const { username, password } = req.body; // Get users credentials from request

        if (username && password) { // Check if request contains username and password propperty 

            const data = await UserModel.findOne({
                attributes: ['uuid', 'Firstname', 'Lastname', 'Username', 'Password', 'RefreshToken'],
                where: {
                    [Op.or]: [  // Check if Username or Email exists in database 
                        { Username: username },
                        { Email: username }
                    ]
                }
            })

            if (!data) { // if UserModel.findOne() returns null, stop function, and tell user something went wrong
                return res.status(401).send({ message: "Invalid credentials" });
            }



            bcrypt.compare(password, data.Password, (err, result) => { //Check if provided password and encrypted password match
                if (result) {
                    UserModel.findOne(
                        {
                            where: { uuid: data.uuid } // find user that is trying to login in 
                        }).then(function (record) {

                            if (data.RefreshToken) { // Check if a refresh token is allready present
                                console.log(data.RefreshToken)
                            }
                            else { // no refresh token was found and the user what authenticated so we creat a new refresh token
                                const GenerateRefreshToken = jwt.sign({  // Generating refresh token
                                    exp: Math.floor(Date.now() / 1000) + (5 * 24 * 60 * 60), // Setting refresh token expiration date, this will be longer than access token exp date
                                    data: { uuid: data.uuid }, // set payload of refreshtoken
                                }, process.env.REFRESH_KEY); // set refresh token secret 
                                record.update( // update refreshtoken field, where requested user uuid 
                                    { RefreshToken: GenerateRefreshToken },
                                    { where: { uuid: data.uuid } }
                                );
                            }

                        })

                    const payload = { // set access token payload
                        uuid: data.uuid,
                        Firstname: data.Firstname,
                        Lastname: data.Lastname,
                        Username: data.Username,
                        Email: data.Email
                    }
                    const token = jwt.sign({ //Generating access token
                        exp: Math.floor(Date.now() / 1000) + 900, // token expires in 15 minutes, Setting access token expiration date, this must be shorter than refresh token exp date
                        data: payload,
                    }, process.env.TOKEN_KEY);  // set access token secret 
                    console.log(Math.floor(Date.now()))
                    res.cookie('token', token, { secure: true });
                    res.status(200).send({ message: "Cookie set" });
                } else {
                    // password did not match
                    res.status(401).send({ message: "Invalid credentials" });
                    console.log("Password Comparison failed")
                }
            })
        } else {
            // credentials did not match
            res.status(401).send({ message: "Invalid credentials" });
        }

    }

    protected = async (req, res) => {

        if (req.headers['authorization'] === undefined) { // no bearer token was sent with the request.
            return res.status(401).send("Invalid token. Please authenticate and try again.")
        }


        const Header = req.headers['authorization']
        const AccessToken = Header.split("Bearer ")[1]; // remove "bearer" 

        jwt.verify(AccessToken, process.env.TOKEN_KEY, (err, data) => { // Check if access token is valid
            console.log(err)
            if (err) {
                switch (err.message) {
                    case "invalid token":
                        console.log(err.message)
                        res.status(401).send("Invalid token. Please authenticate and try again.")
                        break;
                    case "jwt expired": // the access token has expired so we must now check if there is a refreshtoken
                        console.log(err.message)
                        RefreshAuthenticate(false)
                        break;
                }
            }
            else {
                // access token is valid, Check if Refresh Token still exists(if not the session has been ended for some reason)
                RefreshAuthenticate(true)

            }

        })

        async function RefreshAuthenticate(AccessTokenValid) {
            console.log("Fetching refresh token")
            const Decoded = jwt.decode(AccessToken); // decode accesstoken to find user
            const UserId = Decoded.data.uuid
            const User = await UserModel.findOne({  // find requested user 
                where: { uuid: UserId },
                attributes: ["RefreshToken"], // fetch users refreshtoken
            })
            if (!User) { // User was deleted from data base so he no longer has access
                console.log("No such user")
                return res.status(401).send({ message: "Invalid credentials" });
            }
            if (User.RefreshToken) { // there is a refresh token present but we must still verify if refresh token is valid
                console.log("Refresh token detected")
                jwt.verify(User.RefreshToken, process.env.REFRESH_KEY, (err, data) => {
                    if (err) {
                        console.log("Session expired")
                        UserModel.findOne( // if refresh token is not valid, remove it from the database
                            {
                                where: { uuid: UserId }
                            }).then(function (record) {
                                record.update(
                                    { RefreshToken: null },
                                    { where: { uuid: UserId } }
                                );
                            })
                        return res.status(401).send({ message: "Session expired" });
                    } else {
                        // refresh token was detected and verified user now receives a new access token!
                        console.log(AccessTokenValid)
                        if (AccessTokenValid) {
                            res.sendStatus(200)
                        }
                        else {
                            const payload = {
                                uuid: Decoded.data.uuid,
                                Firstname: Decoded.data.Firstname,
                                Lastname: Decoded.data.Lastname,
                                Username: Decoded.data.Username,
                                Email: Decoded.data.Email
                            }

                            const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + 900, // token expires in 15 minutes
                                data: payload,
                            }, process.env.TOKEN_KEY);
                            console.log("New access token generated")
                            res.cookie('token', token, { secure: true });
                            res.status(200).send({ message: "Cookie set" });

                        }
                    }

                })

            }
            else {
                // No Refresh token detected
                console.log("No Refresh token detected, please authenticate again")
                return res.sendStatus(401)
            }
        }
    }
}

export { AuthController }