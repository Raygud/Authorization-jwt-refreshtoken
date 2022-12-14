import express from "express";
import { RecoveryController } from '../Controllers/Recovery.controller.js'
import verifyToken from '../Middleware/verifyToken.js' 

const controller = new RecoveryController();

const router = express.Router()

router.post('/Recovery', (req, res) => {controller.recovery(req,res)})


export { router }