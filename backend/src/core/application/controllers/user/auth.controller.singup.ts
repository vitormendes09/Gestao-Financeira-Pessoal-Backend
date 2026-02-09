// auth.controller.singup.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserServiceSignup } from 'src/core/application/services/user/user.service.singup';
import { CreateUserDto } from '../../dto/user/user.dto.create';

@Controller('auth') 
export class AuthControllerSignup {
  constructor(
    private readonly userServiceSignup: UserServiceSignup,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userServiceSignup.signup(createUserDto);
      const token = this.jwtService.sign({ 
        sub: user._id, 
        email: user.email 
      });
      
      // Retornar APENAS user e token (sem wrapper adicional)
      return {
        user,
        token,
      };
    } catch (error) {
      if (error.status === 409) {
        throw new HttpException(
          {
            statusCode: 409,
            message: 'Email já está em uso',
            error: 'Conflict',
          },
          HttpStatus.CONFLICT
        );
      }
      throw error;
    }
  }
}