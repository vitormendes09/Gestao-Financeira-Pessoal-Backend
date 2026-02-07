import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { AuthModule } from './modules/auth/auth.module'; // Corrigido
import { DatabaseModule } from './core/infrastructure/persistence/mongoose/mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule, 
    TransactionModule, 
  ],
})
export class AppModule {}