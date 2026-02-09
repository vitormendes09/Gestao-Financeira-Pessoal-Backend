import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './core/infrastructure/persistence/mongoose/mongoose.module';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Configurações
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Módulos da aplicação
    DatabaseModule,
    AuthModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}