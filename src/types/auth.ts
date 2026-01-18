export interface User {
  id: number
  username: string
  email: string
  role: 'ADMIN' | 'USER'
  createdAt?: string
  updatedAt?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface CreateUserRequest {
  username: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  password?: string
  role?: 'ADMIN' | 'USER'
}
