// lib/api/client.ts
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// **MIDDLEWARE PARA ADICIONAR TOKEN - VERSÃO SIMPLES E FUNCIONAL**
api.interceptors.request.use(
  (config) => {
    // Apenas no cliente (não no SSR)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('🔑 Token adicionado à requisição:', config.url)
      } else {
        console.warn('⚠️ Token não encontrado para:', config.url)
      }
    }
    return config
  },
  (error) => {
    console.error('❌ Erro no interceptor de request:', error)
    return Promise.reject(error)
  }
)

// **EXPORTAR A INSTÂNCIA**
export { api }