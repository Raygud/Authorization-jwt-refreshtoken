import InteresoUserModel from "../Models/InteresoUser.model.js"
import OrginizationModel from "../Models/Orginization.model.js"
import { Sequelize } from "sequelize"

OrginizationModel.hasMany(InteresoUserModel);
InteresoUserModel.belongsTo(OrginizationModel);


class InteresoUserController {
  constructor() {
    console.log("Instance call of Course controller");
  }

  list = async (req, res) => {
    const result = await InteresoUserModel.findAndCountAll({
      include: OrginizationModel
      
    }
    
    );
    res.json(result);
  };

  StaffList = async (req, res) => {
   
    const User = await InteresoUserModel.findOne({
      where: { id: req.query.id },
      include: [
        {
          model: OrginizationModel,
          attributes: ["id", "Name"],
        },
      ],
    });
    console.log(User)
    if(User === null){ return res.sendStatus(404)}
    const Users = await InteresoUserModel.findAndCountAll({
      where: { id: {
        [Sequelize.Op.not]: 19
      } },
      include: [
        {
          model: OrginizationModel,
          where: { id: User.OrginizationId},
          attributes: ["id", "Name"],
        },
      ],
    });
    const result = {User,Users}
    res.json(result);
  };
  
  get = async (req, res) => {
    const result = await InteresoUserModel.findOne({
      where: { id: req.params.id },
    });
    res.json(result);
  };

  create = async (req, res) => {
    const { Username, Email, Password, Firstname, Lastname, DateOfBirth, Phone, Gender, Country, City, JobTitle, ProfilePicture, OrginizationId} = req.body;
    if ( Username && Email && Password && Firstname && Lastname && DateOfBirth && Phone && Gender && Country && City && JobTitle && ProfilePicture && OrginizationId) {
      console.log("penis")

      const model = await InteresoUserModel.create(req.body);
      return res.json({ newId: model.id });
    } else {
      res.sendStatus(418);
    }
  };

  update = async (req, res) => {

    const { Username, Email, Password, Firstname, Lastname, DateOfBirth, Phone, Gender, Country, City, JobTitle, ProfilePicture, OrginizationId} = req.body;
    if ( Username && Email && Password && Firstname && Lastname && DateOfBirth && Phone && Gender && Country && City && JobTitle && ProfilePicture && OrginizationId) {
      const model = await InteresoUserModel.update(req.body, {
        where: { id: req.query.id },
        individualHooks: true,
      });
      return res.json({ status: true });
    } else {
      res.sendStatus(418);
    }
  };

  delete = async (req, res) => {
    try {
      await InteresoUserModel.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  };
}

export { InteresoUserController };