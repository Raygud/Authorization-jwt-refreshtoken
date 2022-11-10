import express from "express";
import { InteresoUserController } from '../Controllers/InteresoUser.controller.js'
import verifyToken from '../Middleware/verifyToken.js' 

const controller = new InteresoUserController();


const router = express.Router()
// router.get('/InteresoUser', (req, res) => {controller.list(req,res)})
router.get('/InteresoUser', (req, res) => {controller.StaffList(req,res)})
router.post('/InteresoUser', (req, res) => {controller.create(req,res)})
router.put('/InteresoUser', (req, res) => {
    controller.update(req,res)
 })
 router.delete('/InteresoUser/:id([0-9]*)', verifyToken, (req, res) => {
    controller.delete(req,res)
 })

 export  { router }