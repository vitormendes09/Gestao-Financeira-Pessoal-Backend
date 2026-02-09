'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { z } from 'zod'
import { useCreateTransaction } from '../../../lib/hooks/use-transactions'
import { transactionSchema } from '../../../lib/utils/validation'
import { Button } from '../../../components/ui/button'
import toast from 'react-hot-toast'

type FormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  onSuccess?: () => void
}

export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [showRecurrence, setShowRecurrence] = useState(false)
  const createMutation = useCreateTransaction()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      type: 'expense',
    },
  })

  const selectedType = watch('type')

  const onSubmit = async (data: FormData) => {
    try {
      await createMutation.mutateAsync(data)
      toast.success('Transação cadastrada com sucesso!')
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error('Erro ao cadastrar transação')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">Tipo</label>
        <select
          className="input"
          {...register('type')}
          onChange={(e) => setShowRecurrence(e.target.value === 'fixed-expense')}
        >
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
          <option value="fixed-expense">Despesa Fixa</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="label">Descrição</label>
        <input
          type="text"
          className="input"
          placeholder="Aluguel, Salário, etc."
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="label">Valor</label>
        <input
          type="number"
          step="0.01"
          className="input"
          placeholder="0.00"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="label">Data</label>
        <input
          type="date"
          className="input"
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
          {...register('date', { valueAsDate: true })}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      {showRecurrence && (
        <div>
          <label className="label">Dia de Recorrência (1-31)</label>
          <input
            type="number"
            min="1"
            max="31"
            className="input"
            placeholder="5"
            {...register('recurrenceDay', { valueAsNumber: true })}
          />
          {errors.recurrenceDay && (
            <p className="mt-1 text-sm text-red-600">{errors.recurrenceDay.message}</p>
          )}
        </div>
      )}

      <Button
        type="submit"
        loading={createMutation.isPending}
        className="w-full"
      >
        Cadastrar Transação
      </Button>
    </form>
  )
}