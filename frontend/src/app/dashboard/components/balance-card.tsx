'use client'

import { Card, CardContent } from '../../../components/ui/card'
import { formatCurrency } from '../../../lib/utils/date'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface BalanceCardProps {
  title: string
  value: number
  type: 'income' | 'expense' | 'balance' | 'fixed-expense'
  description?: string
}

export default function BalanceCard({
  title,
  value,
  type,
  description,
}: BalanceCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <TrendingUp className="h-6 w-6 text-success-500" />
      case 'expense':
        return <TrendingDown className="h-6 w-6 text-danger-500" />
      case 'balance':
        return <DollarSign className="h-6 w-6 text-primary-500" />
      default:
        return <DollarSign className="h-6 w-6 text-warning-500" />
    }
  }

  const getValueColor = () => {
    if (type === 'balance') {
      return value >= 0 ? 'text-success-600' : 'text-danger-600'
    }
    return 'text-gray-900'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${getValueColor()} mt-2`}>
              {formatCurrency(value)}
            </p>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 bg-gray-50 rounded-full">
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}