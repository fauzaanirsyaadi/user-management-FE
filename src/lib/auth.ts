import { User } from '@/types/auth'

// Helper to get cookie value by name
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// Helper to delete a cookie
function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const getAuth = (): { user: User | null } => {
  const userStr = getCookie('user')
  const user = userStr ? JSON.parse(decodeURIComponent(userStr)) : null
  return { user }
}

export const clearAuth = () => {
  deleteCookie('user')
  // Note: token cookie is HttpOnly and will be cleared by server
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

