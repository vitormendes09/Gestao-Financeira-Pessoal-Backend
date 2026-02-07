import { IUserEntities } from "src/core/application/interfaces/entities/user.entities.inerface";
import { UserModel } from "../schema/user.schema";
import { Types } from 'mongoose';

export class UserMapper {
    static toDomain(userMdel: IUserEntities): UserModel {
        
        const user = new UserModel();
       
        user.email = userMdel.email;
        user.password = userMdel.password;
        
        if (userMdel._id) {
            user._id = new Types.ObjectId(userMdel._id);
        }
        
        return user;
    }

    static toPersistence(user: UserModel): IUserEntities {
        return {
            _id: user._id.toString(),
            email: user.email,
            password: user.password,
        };
    }
} 