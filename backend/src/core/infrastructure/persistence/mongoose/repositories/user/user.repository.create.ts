import { IUserRepositoryCreate} from '../../../../../application/interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {IUserEntities} from '../../../../../application/interfaces/entities/user.entities.inerface';
import { UserModel } from '../../schema/user.schema';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepositoryCreate implements IUserRepositoryCreate {
    constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async create(user: IUserEntities): Promise<IUserEntities> {
    const userDocument = new this.userModel({
      email: user.email,
      password: user.password,
    });
    
    const savedUser = await userDocument.save();
    return UserMapper.toPersistence(savedUser);
  }

}