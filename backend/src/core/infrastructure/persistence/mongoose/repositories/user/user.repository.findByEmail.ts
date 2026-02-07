import { IUserRepositoryFindByEmail} from '../../../../../application/interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../schema/user.schema';
import { IUserEntities } from 'src/core/application/interfaces/entities/user.entities.inerface';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepositoryFindByEmail implements IUserRepositoryFindByEmail {
    constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

    async findByEmail(email: string): Promise<IUserEntities | null> {
    const userDocument = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    
    if (!userDocument) {
      return null;
    }
    return UserMapper.toPersistence(userDocument);
  }
}