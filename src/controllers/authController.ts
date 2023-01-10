import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Service } from "typedi";

import { generarJWT } from "../helpers/jwt";
import { userModel } from "../models/user";
import { authService } from "../services/authService";

@Service()
export class AuthController {
  constructor(private readonly authService: authService) {
  }

  async login(req: Request, res: Response) {
    const { password, email } = req.body;

    //Capturo los errores del check
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.mapped() });
    }

    const token = await this.authService.findUser(email,password);

    
    
    if (token === 1) {
      return res.status(404).json({ message: "User invalid" });
    }


    if (token === 2) {
      return res.status(404).json({ message: "User invalid" });
    }




    res.json({ token });
  }

  async renewToken(req: Request, res: Response) {
    const uid = req.params.uid;
    const token = await this.authService.renewToken(uid)
    res.status(200).json({message: "New token", token:token[0], user:token[1]});
  }
}
