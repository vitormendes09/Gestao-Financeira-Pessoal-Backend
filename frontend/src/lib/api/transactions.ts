import { api } from './client'
import type {
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
  BalanceSummary,
} from '../types/transaction'

export const transactionApi = {
  // Criar transação
  create: async (data: CreateTransactionDto): Promise<{ message: string; data: Transaction }> => {
    const response = await api.post('/transactions', data)
    return response.data
  },

  // Listar transações
  list: async (params?: { month?: number; year?: number }): Promise<Transaction[]> => {
    const response = await api.get('/transactions', { params })
    return response.data
  },

  // Obter saldo mensal - CORRIGIDO: rota correta é /transactions/balance
  getBalance: async (month: number, year: number): Promise<BalanceSummary> => {
    const response = await api.get('/transactions/balance', { 
      params: { month, year } 
    })
    return response.data
  },

  // Obter transação por ID
  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  },

  // Atualizar transação
  update: async (id: string, data: UpdateTransactionDto): Promise<{ message: string; data: Transaction }> => {
    const response = await api.put(`/transactions/${id}`, data)
    return response.data
  },

  // Deletar transação
  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`)
  },
}