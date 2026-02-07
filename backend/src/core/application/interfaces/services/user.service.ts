import { CreateUserDto } from 'src/core/application/dto/user/user.dto.create';
import { LoginUserDto } from 'src/core/application/dto/user/user.dto.login';

export interface IUserServiceSignup {
    signup(CreateUserDto: CreateUserDto);
}

export interface IUserserviceLogin {
    login(loginUserDto: LoginUserDto);
}
