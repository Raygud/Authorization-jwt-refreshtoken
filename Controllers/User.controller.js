import UserModel from "../Models/User.model.js"
import OrginizationModel from "../Models/Orginization.model.js"
import { Sequelize } from "sequelize"

OrginizationModel.hasMany(UserModel);
UserModel.belongsTo(OrginizationModel);


class UserController {
  constructor() {
    console.log("Instance call of Course controller");
  }

  list = async (req, res) => {
    const result = await UserModel.findAndCountAll({
      include: OrginizationModel
      
    }
    
    );
    res.json(result);
  };

  StaffList = async (req, res) => {
   
    const User = await UserModel.findOne({
      where: { uuid: req.query.uuid },
      include: [
        {
          model: OrginizationModel,
          attributes: ["id", "Name"],
        },
      ],
    });
    console.log(User)
    if(User === null){ return res.sendStatus(404)}
    const Users = await UserModel.findAndCountAll({
      where: { uuid: {
        [Sequelize.Op.not]: req.query.uuid
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
    const result = await UserModel.findOne({
      where: { uuid: req.params.uuid },
    });
    res.json(result);
  };

  create = async (req, res) => {
    const { Username, Email, Password, Firstname, Lastname, DateOfBirth, Phone, Gender, Country, City, JobTitle, ProfilePicture, OrginizationId} = req.body;
    if ( Username && Email && Password && Firstname && Lastname && DateOfBirth && Phone && Gender && Country && City && JobTitle && ProfilePicture && OrginizationId) {
      console.log("penis")

      const model = await UserModel.create(req.body);
      return res.json({ newUUID: model.uuid });
    } else {
      res.sendStatus(418);
    }
  };

  update = async (req, res) => {

    const { Username, Email, Password, Firstname, Lastname, DateOfBirth, Phone, Gender, Country, City, JobTitle, ProfilePicture, OrginizationId} = req.body;
    if ( Username && Email && Password && Firstname && Lastname && DateOfBirth && Phone && Gender && Country && City && JobTitle && ProfilePicture && OrginizationId) {
      const model = await UserModel.update(req.body, {
        where: { uuid: req.query.uuid },
        individualHooks: true,
      });
      return res.json({ status: true });
    } else {
      res.sendStatus(418);
    }
  };

  delete = async (req, res) => {
    try {
      await UserModel.destroy({
        where: {
          uuid: req.params.uuid,
        },
      });

      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  };
}

export { UserController };