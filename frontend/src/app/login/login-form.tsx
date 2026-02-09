'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthContext } from '../../providers/auth-provider'
import { loginSchema, registerSchema } from '../../lib/utils/validation'
import { Button } from '../../components/ui/button'
import toast from 'react-hot-toast'

type FormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  isLogin: boolean
}

export default function LoginForm({ isLogin }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuthContext()

  const schema = isLogin ? loginSchema : registerSchema

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  
const onSubmit = async (data: FormData) => {
  setLoading(true)
  console.log('Form submitted:', { email: data.email, isLogin })
  
  try {
    const result = isLogin
      ? await login(data.email, data.password)
      : await register(data.email, data.password)

    console.log('Auth result:', result) // Debug
    
    if (result.success) {
      toast.success(isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!')
    } else {
      toast.error(result.error || 'Ocorreu um erro')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    toast.error('Ocorreu um erro inesperado')
  } finally {
    setLoading(false)
  }
}

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="seu@email.com"
          {...registerField('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="label">
          Senha
        </label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Sua senha"
          {...registerField('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          loading={loading}
          className="w-full"
          disabled={loading}
        >
          {isLogin ? 'Entrar' : 'Criar conta'}
        </Button>
      </div>
    </form>
  )
}