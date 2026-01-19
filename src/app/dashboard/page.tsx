'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, clearAuth, isAdmin } from '@/lib/auth'
import { authService, userService } from '@/lib/services'
import { User } from '@/types/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { user: currentUser } = getAuth()
    setUser(currentUser)
    const loadUserDetail = async () => {
      try {
        let id = currentUser?.id
        if (!id) {
          const fetched = await authService.getCurrentUser()
          id = fetched.id
        }
        if (id) {
          const detail = await userService.getUserById(id)
          setUser(detail)
        }
      } catch {
      }
    }
    loadUserDetail()
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push('/login')
  }

  const navigateToUsers = () => {
    router.push('/users')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">User Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{user?.username}</span>
                {user?.role && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {user.role}
                  </span>
                )}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Welcome to the User Management System. Use the navigation below to manage users.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform translate-x-1/4 -translate-y-1/4">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                   </svg>
                </div>
                
                <div className="flex items-center space-x-3 mb-6 relative z-10">
                    <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">User Profile</h3>
                        <p className="text-sm text-gray-500">Personal Information</p>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm mr-4 ring-1 ring-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Username</p>
                      <p className="text-sm font-bold text-gray-900">{user?.username || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm mr-4 ring-1 ring-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email Address</p>
                      <p className="text-sm font-bold text-gray-900">{user?.email || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
                     <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm mr-4 ring-1 ring-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Role</p>
                      <div>
                        {user?.role ? (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-inset ${
                                user.role === 'ADMIN' 
                                ? 'bg-purple-50 text-purple-700 ring-purple-600/20' 
                                : 'bg-green-50 text-green-700 ring-green-600/20'
                            }`}>
                              {user.role}
                            </span>
                        ) : (
                            <span className="text-sm font-bold text-gray-900">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isAdmin() && (
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600 mb-4">Create, update, and delete users</p>
                  <button
                    onClick={navigateToUsers}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Manage Users
                  </button>
                </div>
              )}

              {!isAdmin() && (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600 mb-4">Admin access required</p>
                  <p className="text-sm text-gray-500">
                    You need administrator privileges to access user management features.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
