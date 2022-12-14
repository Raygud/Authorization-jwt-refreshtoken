import express from "express";
import { UserController } from '../Controllers/User.controller.js'
import verifyToken from '../Middleware/verifyToken.js' 

const controller = new UserController();


const router = express.Router()
router.get('/User', (req, res) => {controller.StaffList(req,res)})
router.post('/User', (req, res) => {controller.create(req,res)})
router.put('/User', (req, res) => {
    controller.update(req,res)
 })
 router.delete('/User/:id([0-9]*)', verifyToken, (req, res) => {
    controller.delete(req,res)
 })

 export  { router }