import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = loginSchema

export const transactionSchema = z.object({
  amount: z.number().positive('O valor deve ser positivo').min(0.01, 'O valor mínimo é 0.01'),
  description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres'),
  date: z.date(),
  type: z.enum(['income', 'expense', 'fixed-expense']),
  recurrenceDay: z.number().min(1).max(31).optional(),
}).refine(data => {
  if (data.type === 'fixed-expense' && !data.recurrenceDay) {
    return false
  }
  return true
}, {
  message: 'Despesas fixas devem ter um dia de recorrência',
  path: ['recurrenceDay'],
})