import { IUserRepositoryUpdate} from '../../../../../application/interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {IUserEntities} from '../../../../../application/interfaces/entities/user.entities.inerface';
import { UserModel } from '../../schema/user.schema';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepositoryUpdate implements IUserRepositoryUpdate {
    constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async update(user: IUserEntities): Promise<IUserEntities> {
    if (!user._id) {
      throw new Error('User ID is required for update');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        user._id,
        {
          email: user.email,
          password: user.password,
        },
        { new: true },
      )
      .exec();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return UserMapper.toPersistence(updatedUser);
  }
}