import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserLoginController } from '../../interfaces/controllers/user.controller.interface';
import { UserServiceLogin } from 'src/core/application/services/user/user.service.login'; // Importe a classe concreta
import { LoginUserDto } from '../../dto/user/user.dto.login';

@Controller('auth')
export class AuthControllerLogin implements IUserLoginController {
  constructor(
    private readonly userServiceLogin: UserServiceLogin, // Use UserServiceLogin, não UserServiceSignup
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userServiceLogin.login(loginUserDto); // Use userServiceLogin
    const token = this.jwtService.sign({ 
      sub: user._id, 
      email: user.email 
    });
    
    return {
      user,
      token,
    };
  }
}