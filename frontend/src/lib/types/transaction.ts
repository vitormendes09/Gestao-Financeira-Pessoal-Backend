export type TransactionType = 'income' | 'expense' | 'fixed-expense'

export interface Transaction {
  _id: string
  amount: number
  description: string
  date: string
  type: TransactionType
  recurrenceDay?: number
  userId: string
}

export interface CreateTransactionDto {
  amount: number
  description: string
  date: Date
  type: TransactionType
  recurrenceDay?: number
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}

export interface BalanceSummary {
  totalIncome: number
  totalExpense: number
  totalFixedExpense: number
  balance: number
}