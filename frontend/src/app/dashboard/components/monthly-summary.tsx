'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useBalance } from '../../../lib/hooks/use-transactions'
import { getMonthName } from '../../../lib/utils/date'
import BalanceCard from './balance-card'
import { LoadingSpinner } from '../../../components/shared/loading-spinner'
import { Card, CardHeader } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ErrorMessage } from '@/components/shared/error-menssage'

export default function MonthlySummary() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { data: balance, isLoading, error, refetch } = useBalance(
    selectedMonth,
    selectedYear
  )

  useEffect(() => {
    refetch()
  }, [selectedMonth, selectedYear, refetch])

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedYear, selectedMonth - 1, 1)
    
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    
    setSelectedMonth(newDate.getMonth() + 1)
    setSelectedYear(newDate.getFullYear())
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Erro ao carregar saldo" />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Resumo Mensal"
          subtitle={getMonthName(selectedMonth) + ' ' + selectedYear}
          action={
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const now = new Date()
                  setSelectedMonth(now.getMonth() + 1)
                  setSelectedYear(now.getFullYear())
                }}
              >
                Hoje
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          }
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BalanceCard
          title="Receitas"
          value={balance?.totalIncome || 0}
          type="income"
          description="Total de entradas"
        />
        
        <BalanceCard
          title="Despesas"
          value={balance?.totalExpense || 0}
          type="expense"
          description="Despesas variáveis"
        />
        
        <BalanceCard
          title="Despesas Fixas"
          value={balance?.totalFixedExpense || 0}
          type="fixed-expense"
          description="Despesas recorrentes"
        />
        
        <BalanceCard
          title="Saldo Final"
          value={balance?.balance || 0}
          type="balance"
          description="Receitas - Despesas"
        />
      </div>
    </div>
  )
}