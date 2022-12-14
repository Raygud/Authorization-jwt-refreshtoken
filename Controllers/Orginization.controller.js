import OrginizationModel from "../Models/Orginization.model.js"
import UserModel from "../Models/User.model.js"

OrginizationModel.hasOne(UserModel);

class OrginizationController {
constructor(){
    console.log("Instance call of Orginization controller")
}

    list = async (req, res) => {
        const result = await OrginizationModel.findAll()
        res.json(result)
    }

    get = async (req, res) => {
        const result = await OrginizationModel.findOne({
            where: { id: req.params.id },
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { Name, Address, Zip, City, Country, Phone, Email} = req.body;

        if( Name && Address && Zip && City && Country && Phone && Email ){
            const model = await OrginizationModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.send(418);
        }

    }

    update = async (req,res) =>{
        const { Name, Address, Zip, City, Country, Phone, Email} = req.body;

        if( Name && Address && Zip && City && Country && Phone && Email ){
            const model = await OrginizationModel.update(req.body,{
                where: { id: req.params.id },
                individualHooks: true
            });
            return res.json({status: true});
        }else{
            res.send(418);
        }

    }

    delete = async (req, res) => {

        try {

            await OrginizationModel.destroy({

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

export {OrginizationController}