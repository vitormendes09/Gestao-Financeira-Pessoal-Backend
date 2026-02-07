import { IUserEntities } from "src/core/application/interfaces/entities/user.entities.inerface";

export class User implements IUserEntities {
  _id?: string; 
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}