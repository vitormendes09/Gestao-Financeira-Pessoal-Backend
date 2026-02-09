import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// **INTERCEPTOR DE RESPOSTA SIMPLIFICADO - SEM transformar response.data**
api.interceptors.response.use(
  (response) => {
    // **IMPORTANTE: Não transforme a resposta aqui**
    // Apenas retorne a resposta completa
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data // Isso deve existir
    })
    return response
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    
    // Rejeitar com a estrutura original do axios
    return Promise.reject(error)
  }
)