import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionApi } from '../api/transactions'
import type { CreateTransactionDto, UpdateTransactionDto } from '../types/transaction'

export const useTransactions = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ['transactions', month, year],
    queryFn: () => transactionApi.list({ month, year }),
    enabled: !!(month && year),
  })
}

export const useBalance = (month: number, year: number) => {
  return useQuery({
    queryKey: ['balance', month, year],
    queryFn: () => transactionApi.getBalance(month, year),
    enabled: !!(month && year),
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: transactionApi.create,
    onSuccess: () => {
      console.log('🔄 Invalidando queries de transações...')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    },
    onError: (error) => {
      console.error('❌ Erro na mutation de criação:', error)
    }
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionDto }) =>
      transactionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    },
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: transactionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    },
  })
}