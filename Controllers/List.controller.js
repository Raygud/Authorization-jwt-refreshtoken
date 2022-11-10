import {Sequelize} from 'sequelize'
import ListModel from "../Models/List.model.js"

class ListController {
constructor(){
    console.log("Instance call of User controller")
}

    list = async (req, res) => {
        const result = await ListModel.findAll()
        res.json(result)
    }

    get = async (req, res) => {
        const result = await ListModel.findOne({
            where: { id: req.params.id }
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { item} = req.body;
        console.log(req.body)

        if(item){
            const model = await ListModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.sendStatus(404);
        }

    }

    update = async (req, res) => {
        const { id, item, amount} = req.body;
    
        if ((id && item && amount)) {
          const model = await ListModel.update(req.body, {
            where: { id: req.body.id },
            individualHooks: true,
          });
          return res.json({ status: true });
        } else {
          res.sendStatus(418);
        }
      };

    delete = async (req, res) => {
        console.log(req.body.id)
        try {

            await ListModel.destroy({

                where: {

                    id: req.body.id,
                }

            })

            res.sendStatus(200)

        } catch (error) {

            res.send(error)

           

        }

    }

}

export {ListController}