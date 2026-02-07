import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthControllerLogin } from 'src/core/application/controllers/user/auth.controller.login';
import { AuthControllerSignup } from 'src/core/application/controllers/user/auth.controller.singup';
import { JwtStrategy } from 'src/core/infrastructure/security/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthControllerLogin, AuthControllerSignup],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}