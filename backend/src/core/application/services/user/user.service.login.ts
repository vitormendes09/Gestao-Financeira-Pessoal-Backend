import { Injectable , ConflictException, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../../dto/user/user.dto.login';
import { UserRepositoryFindByEmail } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.findByEmail'; // Importe a classe concreta
import { IUserserviceLogin } from '../../interfaces/services/user.service';

@Injectable()
export class UserServiceLogin implements IUserserviceLogin {
  constructor(
    private readonly userRepositoryFindByEmail: UserRepositoryFindByEmail,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepositoryFindByEmail.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return result;
  }
} 