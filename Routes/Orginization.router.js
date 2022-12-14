import express from "express"
import { OrginizationController } from '../Controllers/Orginization.controller.js'
import verifyToken from '../Middleware/verifyToken.js' 

const controller = new OrginizationController();

const router = express.Router()

router.get('/orginization', (req, res) => {controller.list(req,res)})
router.post('/orginization', (req, res) => {controller.create(req,res)})
router.put('/orginization/:id([0-9]*)', verifyToken, (req, res) => {
    controller.update(req,res)
 })
 router.delete('/orginization/:id([0-9]*)', verifyToken, (req, res) => {
    controller.delete(req,res)
 })

 export { router }