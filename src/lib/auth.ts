import Cookies from 'js-cookie'
import { User } from '@/types/auth'

export const setAuth = (token: string, user: User) => {
  Cookies.set('token', token, { 
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  Cookies.set('user', JSON.stringify(user), { 
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

export const getAuth = (): { token: string | null; user: User | null } => {
  const token = Cookies.get('token') || null
  const userStr = Cookies.get('user')
  const user = userStr ? JSON.parse(userStr) : null
  return { token, user }
}

export const clearAuth = () => {
  Cookies.remove('token')
  Cookies.remove('user')
}

export const isAuthenticated = (): boolean => {
  const { token } = getAuth()
  return !!token
}

export const hasRole = (role: 'ADMIN' | 'USER'): boolean => {
  const { user } = getAuth()
  return user?.role === role
}

export const isAdmin = (): boolean => {
  return hasRole('ADMIN')
}
