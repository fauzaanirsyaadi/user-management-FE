import { User } from '../types/auth'
import Cookies from 'js-cookie'

export const setAuth = (token: string, user: User) => {
  if (!user) {
    console.warn('Invalid user data provided to setAuth')
    return
  }

  if (token) {
    Cookies.set('token', token, {
      expires: 7,
      secure: false,
      sameSite: 'lax'
    })
  }

  Cookies.set('user', JSON.stringify(user), {
    expires: 7,
    secure: false,
    sameSite: 'lax'
  })
}

export const getAuth = (): { token: string | null; user: User | null } => {
  const token = Cookies.get('token') || null
  const userStr = Cookies.get('user')

  let user: User | null = null
  if (userStr && userStr !== 'undefined' && userStr !== 'null') {
    try {
      user = JSON.parse(userStr)
    } catch (error) {
      console.warn('Failed to parse user data from cookies:', error)
      // Clear corrupted cookie
      Cookies.remove('user')
    }
  }

  return { token, user }
}

export const clearAuth = () => {
  Cookies.remove('token')
  Cookies.remove('user')

  // Also clear from different cookie paths that might exist
  Cookies.remove('token', { path: '/' })
  Cookies.remove('user', { path: '/' })
}

export const isAuthenticated = (): boolean => {
  const { user } = getAuth()
  return !!user
}

export const hasRole = (role: 'ADMIN' | 'USER'): boolean => {
  const { user } = getAuth()
  return user?.role === role
}

export const isAdmin = (): boolean => {
  return hasRole('ADMIN')
}

