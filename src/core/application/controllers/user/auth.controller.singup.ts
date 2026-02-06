import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserSingupController } from '../../interfaces/controllers/user.controller.interface';
import { UserServiceSignup } from 'src/core/application/services/user/user.service.singup'; 
import { CreateUserDto } from '../../dto/user/user.dto.create';

@Controller('auth')
export class AuthControllerSignup implements IUserSingupController {
  constructor(
    private readonly userServiceSignup: UserServiceSignup, // Mantenha UserServiceSignup
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userServiceSignup.signup(createUserDto);
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