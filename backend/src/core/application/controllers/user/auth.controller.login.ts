// auth.controller.login.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserServiceLogin } from 'src/core/application/services/user/user.service.login';
import { LoginUserDto } from '../../dto/user/user.dto.login';

@Controller('auth')
export class AuthControllerLogin {
  constructor(
    private readonly userServiceLogin: UserServiceLogin,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userServiceLogin.login(loginUserDto);
    
    const payload = { 
      sub: user._id, 
      email: user.email 
    };
    
    const token = this.jwtService.sign(payload);
    
    // Retornar APENAS user e token (sem wrapper adicional)
    return {
      user,
      token,
    };
  }
}