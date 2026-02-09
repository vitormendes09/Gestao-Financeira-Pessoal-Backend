export interface User {
  _id: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {}

export interface AuthResponse {
  user: User
  token: string
}