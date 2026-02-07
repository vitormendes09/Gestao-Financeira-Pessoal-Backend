import { CreateUserDto } from "../../dto/user/user.dto.create";
import { LoginUserDto } from "../../dto/user/user.dto.login";

export interface IUserSingupController {
    signup(createUserDto: CreateUserDto);
}

export interface IUserLoginController {
    login(loginUserDto: LoginUserDto);
}