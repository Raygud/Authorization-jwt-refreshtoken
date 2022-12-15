import express from "express";
import { AuthController } from '../Controllers/Auth.controller.js'
import verifyToken from '../Middleware/verifyToken.js'

const controller = new AuthController();

const router = express.Router()

router.post('/Login', (req, res) => { controller.login(req, res) })
router.post('/Protected', (req, res) => { controller.protected(req, res) })
router.post('/Logout', (req, res) => { controller.logout(req, res) })


export { router }