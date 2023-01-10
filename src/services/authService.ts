import { Service } from "typedi";

import { AuthRepository } from "../repository/authRepository";

@Service()
export class authService {
  constructor(private authRepository: AuthRepository) {
  }

  async findUser(username: string, password: string) {
    const auth = await this.authRepository.findUser(username, password);
    return auth;
  }

  async renewToken(uid: string) {
    const token = await this.authRepository.renewToken(uid);
    return token;
  }
}
