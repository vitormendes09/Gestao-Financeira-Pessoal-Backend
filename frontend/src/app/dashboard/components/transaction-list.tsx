// components/dashboard/transaction-list.tsx - ATUALIZADO
'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  useTransactions, 
  useDeleteTransaction 
} from '../../../lib/hooks/use-transactions'
import { formatCurrency } from '../../../lib/utils/date'
import { Button } from '../../../components/ui/button'
import { Card, CardHeader, CardContent } from '../../../components/ui/card'
import { LoadingSpinner } from '../../../components/shared/loading-spinner'
import { 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import { ErrorMessage } from '@/components/shared/error-menssage'
import TransactionFilter from './transaction-filter'

interface TransactionListProps {
  initialMonth?: number
  initialYear?: number
}

export default function TransactionList({ 
  initialMonth = new Date().getMonth() + 1,
  initialYear = new Date().getFullYear()
}: TransactionListProps) {
  const [showFilter, setShowFilter] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(initialMonth)
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const { data: transactions, isLoading, error, refetch } = useTransactions(selectedMonth, selectedYear)
  const deleteMutation = useDeleteTransaction()

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) {
      return
    }

    setDeletingId(id)
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Transação excluída com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir transação')
    } finally {
      setDeletingId(null)
    }
  }

  const handleFilterChange = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
    setShowFilter(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <TrendingUp className="h-5 w-5 text-success-500" />
      case 'expense':
        return <TrendingDown className="h-5 w-5 text-danger-500" />
      case 'fixed-expense':
        return <Calendar className="h-5 w-5 text-warning-500" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'income':
        return 'Receita'
      case 'expense':
        return 'Despesa'
      case 'fixed-expense':
        return 'Despesa Fixa'
      default:
        return type
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Erro ao carregar transações" />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Transações"
          subtitle={`${selectedMonth}/${selectedYear} - Total: ${transactions?.length || 0}`}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2"
            >
              {showFilter ? (
                <>
                  <X className="h-4 w-4" />
                  <span>Fechar Filtro</span>
                </>
              ) : (
                <>
                  <Filter className="h-4 w-4" />
                  <span>Filtrar</span>
                </>
              )}
            </Button>
          }
        />
        
        {showFilter && (
          <CardContent>
            <TransactionFilter
              onFilterChange={handleFilterChange}
              initialMonth={selectedMonth}
              initialYear={selectedYear}
            />
          </CardContent>
        )}
      </Card>

      {!transactions?.length ? (
        <Card>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              Nenhuma transação encontrada para {selectedMonth}/{selectedYear}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getTypeIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-200 rounded">
                          {getTypeLabel(transaction.type)}
                        </span>
                        <span>•</span>
                        <span>
                          {format(new Date(transaction.date), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </span>
                        {transaction.recurrenceDay && (
                          <>
                            <span>•</span>
                            <span>Dia {transaction.recurrenceDay}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-lg font-semibold ${
                        transaction.type === 'income'
                          ? 'text-success-600'
                          : 'text-danger-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(transaction._id)}
                      disabled={deletingId === transaction._id}
                      title="Excluir transação"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}