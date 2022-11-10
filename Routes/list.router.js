import express from "express";
import { ListController } from '../Controllers/List.controller.js'
import  verifyToken  from "../Middleware/verifyToken.js";

const controller = new ListController();

const router = express.Router()

router.get('/List', (req, res) => {controller.list(req,res)})
router.get('/List', (req, res) => {controller.get(req,res)})
router.post('/List', (req, res) => {controller.create(req,res)})
router.put('/List', (req, res) => {controller.update(req,res)})
router.delete("/List", (req, res) => {controller.delete(req, res);});

export { router }