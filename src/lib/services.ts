import api from '@/lib/api'
import { LoginRequest, LoginResponse, User, CreateUserRequest, UpdateUserRequest } from '@/types/auth'

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/auth/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout')
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
