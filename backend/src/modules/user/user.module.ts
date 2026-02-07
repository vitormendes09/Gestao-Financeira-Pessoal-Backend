import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../../core/infrastructure/persistence/mongoose/schema/user.schema';
import { UserRepositoryCreate } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.create';
import { UserRepositoryFindByEmail } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.findByEmail';
import { UserRepositoryFindById } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.findById';
import { UserRepositoryUpdate } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.update';
import { UserRepositoryDelete } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.delete';
import { UserServiceSignup } from 'src/core/application/services/user/user.service.singup';
import { UserServiceLogin } from 'src/core/application/services/user/user.service.login';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
  providers: [
    // Repositórios
    UserRepositoryCreate,
    UserRepositoryFindByEmail,
    UserRepositoryFindById,
    UserRepositoryUpdate,
    UserRepositoryDelete,
    
    // Services/Use Cases
    UserServiceSignup,
    UserServiceLogin,
  ],
  exports: [
    // Exporte os repositórios
    UserRepositoryCreate,
    UserRepositoryFindByEmail,
    UserRepositoryFindById,
    UserRepositoryUpdate,
    UserRepositoryDelete,
    
    // Exporte os services/use cases também
    UserServiceSignup,
    UserServiceLogin,
  ],
})
export class UserModule {}