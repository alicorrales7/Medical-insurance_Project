import { Service } from "typedi";

import { UserDTO } from "../DTO/userDTO";
import { User } from "../models/user";

@Service()
export class UserMap {
  mapEntityToDto(t: User | null): UserDTO {
    const mapper = {
      name: t?.name,
      email: t?.email,
      username: t?.username,
      password: t?.password,
    };

    const returnDto = new UserDTO(mapper);
    return returnDto;
  }

  mapJsonToDto(t: UserDTO): UserDTO {
    const mapper = {
      name: t?.name,
      email: t?.email,
      username: t?.username,
      password: t?.password,
    };
    const retur = new UserDTO(mapper);
    return retur;
  }
}
