import api from '@/lib/api'
import { LoginRequest, LoginResponse, User, CreateUserRequest, UpdateUserRequest } from '@/types/auth'

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Use the Next.js API route for login
    const response = await fetch('/app-api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data = await response.json()
    // Token is handled by HttpOnly cookie set by the API route
    // User data is also set in a cookie by the API route, but we return it here for immediate UI updates if needed
    return { token: data.token || '', user: data.user }
  },

  async logout(): Promise<void> {
    // Use the Next.js API route for logout
    await fetch('/app-api/auth/logout', {
      method: 'POST',
    })
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/api/users')
    return response.data
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/api/users/${id}`)
    return response.data
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post<User>('/api/users', userData)
    return response.data
  },

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put<User>(`/api/users/${id}`, userData)
    return response.data
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/api/users/${id}`)
  },
}
