import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel, UserSchema } from './schema/user.schema';
import { TransactionModel, TransactionSchema } from './schema/transaction.schema'; // Importar

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TransactionModel.name, schema: TransactionSchema }, // Adicionar
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {} 