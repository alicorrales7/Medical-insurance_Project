import bcrypt from "bcrypt";
import { Service } from "typedi";

import { generarJWT } from "../helpers/jwt";
import { userModel } from "../models/user";
import { UserMap } from "../validates/userMap";

@Service()
export class AuthRepository {
  constructor(private userMap: UserMap) {}

  async findUser(email: string, password: string) {
    const pass = password;

    //Verificar emial
    const userDB = await userModel.findOne({ email });

    
    if (!userDB) {
      return 1;
    }

    //Verifiar password
    const validPassword = bcrypt.compareSync(pass, userDB.password);

    if (!validPassword) {
      return 2;
    }

        //Generar Token - JWT
    const token = await generarJWT(userDB.id);
    return token;
  }

  async renewToken(uid: string) {
    const convert = { "_id": uid };
    const token = await generarJWT(uid);

    const user = await userModel.findOne(convert);
    return [token, user];
  }

}
