import { Service } from "typedi";

import { UserDTO } from "../DTO/userDTO";
import { UserRepository } from "../repository/userRepository";
import { UserMap } from "../validates/userMap";

@Service()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private userMap: UserMap
  ) {}

  async getAllUsers() {
    const resultGetAllUser = this.userRepository.find();
    return resultGetAllUser;
  }

  async getUser(id: string) {
    const resultGetUser = this.userRepository.findById(id);
    return resultGetUser;
  }

  async insertUsers(document: UserDTO) {
    const transp = this.userMap.mapJsonToDto(document);
    const resultInsert = this.userRepository.insert(transp);
    return resultInsert;
  }

  async updateUser(id: string, document: JSON) {
    const resultUpdate = this.userRepository.update(id, document);
    return resultUpdate;
  }
  async deleteUser(id: string) {
    const resultDelete = this.userRepository.delete(id);
    return resultDelete;
  }
}

export default UserService;
