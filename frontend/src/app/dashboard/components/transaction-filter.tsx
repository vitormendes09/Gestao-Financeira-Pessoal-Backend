'use client'

import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Calendar } from 'lucide-react'

interface TransactionFilterProps {
  onFilterChange: (month: number, year: number) => void
  initialMonth?: number
  initialYear?: number
}

export default function TransactionFilter({ 
  onFilterChange, 
  initialMonth = new Date().getMonth() + 1,
  initialYear = new Date().getFullYear()
}: TransactionFilterProps) {
  const [month, setMonth] = useState(initialMonth)
  const [year, setYear] = useState(initialYear)

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const handleApplyFilter = () => {
    onFilterChange(month, year)
  }

  const handleResetFilter = () => {
    const now = new Date()
    setMonth(now.getMonth() + 1)
    setYear(now.getFullYear())
    onFilterChange(now.getMonth() + 1, now.getFullYear())
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filtrar por período</h3>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleResetFilter}
        >
          Limpar filtro
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mês
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="input w-full"
          >
            {months.map((monthName, index) => (
              <option key={index} value={index + 1}>
                {monthName}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ano
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="input w-full"
          >
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <Button
          onClick={handleApplyFilter}
          className="w-full"
        >
          Aplicar Filtro
        </Button>
      </div>
    </div>
  )
}