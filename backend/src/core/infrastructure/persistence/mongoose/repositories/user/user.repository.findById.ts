import { IUserRepositoryFindById} from '../../../../../application/interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../schema/user.schema';
import { IUserEntities } from 'src/core/application/interfaces/entities/user.entities.inerface';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepositoryFindById implements IUserRepositoryFindById {
    constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

   async findById(id: string): Promise<IUserEntities | null> {
    const userDocument = await this.userModel.findById(id).exec();

    if (!userDocument) {
      return null;
    }
    return UserMapper.toPersistence(userDocument);
  }
}