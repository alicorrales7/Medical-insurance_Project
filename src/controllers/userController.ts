import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Service } from "typedi";

import { userModel } from "../models/user";
import UserService from "../services/userService";

@Service()
class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(res: Response) {
    const resultFind = await this.userService.getAllUsers();
    return res.json({ Result: "Get User", resultFind });
  }

  async getUser(req: Request, res: Response) {
    const user = req.params.id;
    if (user.length == 24) {
      const resultGetUser = await this.userService.getUser(user);
      return res.json(resultGetUser);
    } else {
      return res.status(200).json({ Result: "Format Id Incorrecto" });
    }
  }

  async createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const emailExiste = await userModel.findOne({ email });

      //Verifico que el user no exista ya
      if (emailExiste) {
        return res.status(400).json({ message: "El usuario ya esta existe" });
      }

      //Creo el usuario con el cuerpo de la peticion
      const user = new userModel(req.body);

      //Encriptar el password
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      //Guardar usuario en la BD
      await user.save();

      //Respuesta en un JSON
      res.json({ user });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error inesperado... revisar logs" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const user = req.params.id;
    const update = req.body;
    if (user.length == 24) {
      const resultUpdate = this.userService.updateUser(user, req.body);
      return res.json({
        Result: "Update User is Successful",
        resultUpdate,
        update
      });
    } else {
      return res.json({ Result: "Format Id Incorrecto" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const user = req.params.id;
    if (user.length == 24) {
      const resultDelete = this.userService.deleteUser(req.params.id);
      return res.status(204).json({ Result: "Delete User" });
    } else {
      return res.json({ Result: "Format Id Incorrecto" });
    }
  }
}

export default UserController;
