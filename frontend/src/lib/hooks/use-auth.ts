import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '../api/auth'
import type { User } from '../types/auth'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        
        console.log('Loading user from localStorage:', { 
          hasUser: !!storedUser, 
          hasToken: !!storedToken 
        })
        
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch (error) {
            console.error('Error parsing user from localStorage:', error)
            localStorage.clear()
          }
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email })
    
    try {
      const response = await authApi.login({ email, password })
      console.log('Login successful:', response)
      
      // Salvar no localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      setUser(response.user)
      
      // Redirecionar
      router.push('/dashboard')
      return { success: true }
    } catch (error: any) {
      console.error('Login failed:', error)
      
      // Extrair mensagem de erro
      let errorMessage = 'Credenciais inválidas'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  }

  const register = async (email: string, password: string) => {
    console.log('Register attempt:', { email })
    
    try {
      const response = await authApi.register({ email, password })
      console.log('Register successful:', response)
      
      // Salvar no localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      setUser(response.user)
      
      // Redirecionar
      router.push('/dashboard')
      return { success: true }
    } catch (error: any) {
      console.error('Register failed:', error)
      
      // Extrair mensagem de erro
      let errorMessage = 'Erro ao criar conta'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  }

  const logout = () => {
    console.log('Logout')
    authApi.logout()
    setUser(null)
    router.push('/login')
  }

  return { user, login, register, logout, loading }
}