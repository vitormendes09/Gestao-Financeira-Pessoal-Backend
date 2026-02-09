// lib/api/transactions.ts - ARQUIVO CORRETO
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
  console.log('📝 Criando transação:', data)
  
  // A API espera ISO string, então convertemos aqui
  const transactionData = {
    ...data,
    date: data.date instanceof Date ? data.date.toISOString() : data.date
  }
  
  console.log('📤 Enviando dados (convertidos):', transactionData)
  
  try {
    const response = await api.post('/transactions', transactionData)
    console.log('✅ Resposta da API:', response.data)
    return response.data
  } catch (error: any) {
    console.error('❌ Erro ao criar transação:', error.response?.data || error.message)
    throw error
  }
},

  // Listar transações - CORRIGIDO: a API retorna { data: [] }
  list: async (params?: { month?: number; year?: number }): Promise<Transaction[]> => {
    console.log('📋 Buscando transações com params:', params)
    
    try {
      const response = await api.get('/transactions', { params })
      console.log('✅ Resposta da API (transações):', response.data)
      
      // A API retorna { data: [] } ou apenas o array direto
      return response.data?.data || response.data || []
    } catch (error: any) {
      console.error('❌ Erro ao buscar transações:', error.response?.data || error.message)
      throw error
    }
  },

  // Obter saldo mensal - CORRIGIDO: a API retorna { data: {} }
  getBalance: async (month: number, year: number): Promise<BalanceSummary> => {
    console.log('💰 Buscando saldo para:', { month, year })
    
    try {
      const response = await api.get('/transactions/balance', { 
        params: { month, year } 
      })
      console.log('✅ Resposta da API (saldo):', response.data)
      
      // A API retorna { data: {} } ou o objeto direto
      const balanceData = response.data?.data || response.data
      
      return balanceData || {
        totalIncome: 0,
        totalExpense: 0,
        totalFixedExpense: 0,
        balance: 0
      }
    } catch (error: any) {
      console.error('❌ Erro ao buscar saldo:', error.response?.data || error.message)
      throw error
    }
  },

  // Obter transação por ID
  getById: async (id: string): Promise<Transaction> => {
    try {
      const response = await api.get(`/transactions/${id}`)
      return response.data?.data || response.data
    } catch (error: any) {
      console.error('❌ Erro ao buscar transação:', error)
      throw error
    }
  },

  // Atualizar transação
  update: async (id: string, data: UpdateTransactionDto): Promise<{ message: string; data: Transaction }> => {
    try {
      const response = await api.put(`/transactions/${id}`, data)
      return response.data
    } catch (error: any) {
      console.error('❌ Erro ao atualizar transação:', error)
      throw error
    }
  },

  // Deletar transação
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/transactions/${id}`)
    } catch (error: any) {
      console.error('❌ Erro ao deletar transação:', error)
      throw error
    }
  },
}