import { IUserRepositoryDelete} from '../../../../../application/interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../schema/user.schema';

@Injectable()
export class UserRepositoryDelete implements IUserRepositoryDelete {
    constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

   async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

}