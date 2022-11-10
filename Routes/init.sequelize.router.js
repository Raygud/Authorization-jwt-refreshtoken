import express from 'express'
import { sequelize } from '../Config/db.sequelize.js'

const router = express.Router();


//he
router.get('/init', (req,res) => {
    try{
        sequelize.sync();
        res.sendStatus(200);
    }
    catch{
        res.send(err);
    }
})

export { router }