'use client'

import { useState } from 'react'
import TransactionForm from './components/transaction-form'
import TransactionList from './components/transaction-list'
import MonthlySummary from './components/monthly-summary'
import { Card, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'
import { Modal } from '../../components/ui/modal'

export default function DashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  return (
    <div className="space-y-6">
      {/* Resumo Mensal */}
      <MonthlySummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Transação */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="Nova Transação"
              subtitle="Adicione receitas ou despesas"
              action={
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="lg:hidden"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              }
            />
            <div className="p-6">
              <TransactionForm onSuccess={() => setIsFormOpen(false)} />
            </div>
          </Card>
        </div>

        {/* Lista de Transações */}
        <div className="lg:col-span-2">
          <TransactionList month={selectedMonth} year={selectedYear} />
        </div>
      </div>

      {/* Modal para mobile */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Nova Transação"
      >
        <TransactionForm onSuccess={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  )
}