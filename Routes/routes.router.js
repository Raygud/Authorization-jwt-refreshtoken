import express from "express";
import { RoutesController } from '../Controllers/Routes.controller.js'

const controller = new RoutesController();

const router = express.Router()

router.get('/Routes', (req, res) => {controller.list(req,res)})
router.get('/Routes/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/Routes', (req, res) => {controller.create(req,res)})
router.put('/Routes', (req, res) => {controller.update(req,res)})


export { router }