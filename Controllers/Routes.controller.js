import {Sequelize} from 'sequelize'
import RoutesModel from "../Models/Routes.model.js"

const User = new RoutesModel;

class RoutesController {
constructor(){
    console.log("Instance call of User controller")
}

    list = async (req, res) => {
        const result = await RoutesModel.findAll()
        res.json(result)
    }

    get = async (req, res) => {
        const result = await RoutesModel.findOne({
            where: { id: req.params.id }
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { name, grade, description, image, lat, lng} = req.body;
        console.log(req.body)

        if(name && grade && description && image && lat && lng){
            const model = await RoutesModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.sendStatus(404);
        }

    }

    update = async (req, res) => {
        const { name, grade, rate, send, description, image, lat, lng} = req.body;
    
        if ((name && grade && rate && send && description && image && lat && lng)) {
          const model = await RoutesModel.update(req.body, {
            where: { id: req.body.id },
            individualHooks: true,
          });
          return res.json({ status: true });
        } else {
          res.sendStatus(418);
        }
      };

    delete = async (req, res) => {

        try {

            await RoutesModel.destroy({

                where: {

                    id: req.params.id

                }

            })

            res.sendStatus(200)

        } catch (error) {

            res.send(error)

           

        }

    }

}

export {RoutesController}