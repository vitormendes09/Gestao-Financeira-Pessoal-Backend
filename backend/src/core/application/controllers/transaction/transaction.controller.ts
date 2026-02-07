import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request, 
  ParseUUIDPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Import dtos
import { CreateTransactionDto } from '../../dto/transaction/transaction.dto.create';
import { UpdateTransactionDto } from '../../dto/transaction/transaction.dto.update';
import { TransactionQueryDto } from '../../dto/transaction/transaction.dto.query';
import { BalanceQueryDto } from '../../dto/transaction/transaction.dto.balance';

// Import services concretos
import { TransactionServiceCreate } from 'src/core/application/services/transactions/transaction.service.create';
import { TransactionServiceUpdate } from 'src/core/application/services/transactions/transaction.service.update';
import { TransactionServiceFindByUser } from 'src/core/application/services/transactions/transaction.service.findByUser';
import { TransactionServiceFindById } from 'src/core/application/services/transactions/transaction.service.findById';
import { TransactionServiceDelete } from 'src/core/application/services/transactions/transaction.service.delete';
import { TransactionServiceGetBalance } from 'src/core/application/services/transactions/transaction.service.getBalance';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(
    private readonly transactionServiceCreate: TransactionServiceCreate,
    private readonly transactionServiceUpdate: TransactionServiceUpdate,
    private readonly transactionServiceFindByUser: TransactionServiceFindByUser,
    private readonly transactionServiceFindById: TransactionServiceFindById,
    private readonly transactionServiceDelete: TransactionServiceDelete,
    private readonly transactionServiceGetBalance: TransactionServiceGetBalance,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const userId = req.user.userId;
    
    const transaction = await this.transactionServiceCreate.create(
      createTransactionDto, 
      userId
    );
    
    return {
      message: 'Transaction created successfully',
      data: transaction,
    };
  }

  @Get()
  async findByUser(@Query() query: TransactionQueryDto, @Request() req) {
    const userId = req.user.userId;
    
    const transactions = await this.transactionServiceFindByUser.findByUser(
      userId, 
      query
    );
    
    return {
      data: transactions,
    };
  }

  @Get('balance')
  async getBalance(@Query() query: BalanceQueryDto, @Request() req) {
    const userId = req.user.userId;
    
    const balance = await this.transactionServiceGetBalance.getBalance(
      userId,
      query
    );
    
    return {
      data: balance,
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const userId = req.user.userId;
    
    const transaction = await this.transactionServiceFindById.findById(
      id,
      userId
    );
    
    return {
      data: transaction,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req
  ) {
    const userId = req.user.userId;
    
    const transaction = await this.transactionServiceUpdate.update(
      id,
      updateTransactionDto,
      userId
    );
    
    return {
      message: 'Transaction updated successfully',
      data: transaction,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const userId = req.user.userId;
    
    await this.transactionServiceDelete.delete(id, userId);
  }
}