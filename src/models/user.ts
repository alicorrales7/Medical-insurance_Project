import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop()
  name: string;

  @prop()
  email: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true, minlength: 8 })
  password: string;
}

export const userModel = getModelForClass(User);
