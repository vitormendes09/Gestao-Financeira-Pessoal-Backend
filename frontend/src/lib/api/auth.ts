import { api } from './client'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('Login request to:', '/auth/login')
    console.log('Credentials:', credentials)
    
    try {
      // Faça a requisição e capture a resposta completa
      const response = await api.post('/auth/login', credentials)
      console.log('Login response:', response.data)
      
      // A resposta já vem como { user, token }
      return response.data
    } catch (error: any) {
      console.error('Login API error:', error.response?.data || error.message)
      throw error
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    console.log('Register request to:', '/auth/signup')
    console.log('Credentials:', credentials)
    
    try {
      // Faça a requisição e capture a resposta completa
      const response = await api.post('/auth/signup', credentials)
      console.log('Register response:', response.data)
      
      // A resposta já vem como { user, token }
      return response.data
    } catch (error: any) {
      console.error('Register API error:', error.response?.data || error.message)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}