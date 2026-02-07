import { User } from "src/core/domain/entities/user.entity";


export interface IUserRepositoryCreate {
  create(user: User): Promise<User>;
}

export interface IUserRepositoryUpdate {
  update(user: User): Promise<User>;
}

export interface IUserRepositoryFindById {
  findById(id: string): Promise<User | null>;
}

export interface IUserRepositoryFindByEmail {
  findByEmail(email: string): Promise<User | null>;
}

export interface IUserRepositoryDelete{
  delete(id: string): Promise<void>;
}