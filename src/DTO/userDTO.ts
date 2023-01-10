import { Entity, SafeType } from "dto-mapping";

@Entity()
export class UserDTO {
  @SafeType({ type: String })
  name: string;

  @SafeType({ type: String })
  email: string;

  @SafeType({ type: String })
  username: string;

  @SafeType({ type: String })
  password: string;

  constructor(obj: any) {
    this.name = obj.name;
    this.email = obj.email;
    this.username = obj.username;
    this.password = obj.password;
  }
}
