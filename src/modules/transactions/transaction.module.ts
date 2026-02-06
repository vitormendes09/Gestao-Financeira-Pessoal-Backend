import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModel, TransactionSchema } from '../../core/infrastructure/persistence/mongoose/schema/transaction.schema';

// Import repositories
import { TransactionRepositoryCreate } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.create';
import { TransactionRepositoryUpdate } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.update';
import { TransactionRepositoryFindById } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findById';
import { TransactionRepositoryFindByUser } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.findByUser';
import { TransactionRepositoryDelete } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.delete';
import { TransactionRepositoryGetBalance } from 'src/core/infrastructure/persistence/mongoose/repositories/transaction/transaction.repository.getBalance';

// Import services
import { TransactionServiceCreate } from 'src/core/application/services/transactions/transaction.service.create';
import { TransactionServiceUpdate } from 'src/core/application/services/transactions/transaction.service.update';
import { TransactionServiceFindByUser } from 'src/core/application/services/transactions/transaction.service.findByUser';
import { TransactionServiceDelete } from 'src/core/application/services/transactions/transaction.service.delete';
import { TransactionServiceFindById } from 'src/core/application/services/transactions/transaction.service.findById';
import { TransactionServiceGetBalance } from 'src/core/application/services/transactions/transaction.service.getBalance';

// Import controller
import { TransactionController } from 'src/core/application/controllers/transaction/transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionModel.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    // Repositórios
    TransactionRepositoryCreate,
    TransactionRepositoryUpdate,
    TransactionRepositoryFindById,
    TransactionRepositoryFindByUser,
    TransactionRepositoryDelete,
    TransactionRepositoryGetBalance,
    
    // Services
    TransactionServiceCreate,
    TransactionServiceUpdate,
    TransactionServiceFindByUser,
    TransactionServiceFindById,
    TransactionServiceDelete,
    TransactionServiceGetBalance,
  ],
  exports: [
    // Exportar se necessário para outros módulos
    MongooseModule,
  ],
})
export class TransactionModule {}