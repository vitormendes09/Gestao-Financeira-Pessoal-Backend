import { Injectable , ConflictException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dto/user/user.dto.create';
import { UserRepositoryCreate } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.create'; // Importe as classes concretas
import { UserRepositoryFindByEmail } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.findByEmail'; // Importe as classes concretas
import { IUserServiceSignup } from '../../interfaces/services/user.service';

@Injectable()
export class UserServiceSignup implements IUserServiceSignup {
  constructor(
    private readonly userRepositoryCreate: UserRepositoryCreate, // Use classes concretas
    private readonly userRepositoryFindByEmail: UserRepositoryFindByEmail, // Use classes concretas
  ) { }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepositoryFindByEmail.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepositoryCreate.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return result;
  }
}