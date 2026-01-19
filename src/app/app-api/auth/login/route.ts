import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Forward login request to backend
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }))
      return NextResponse.json(
        { message: errorData.message || 'Login failed' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Construct user object from flat response
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role
    }

    if (!data.token) {
      throw new Error('Server returned no token')
    }

    // Create response with user data
    const nextResponse = NextResponse.json({
      user: user,
      token: data.token,
      message: 'Login successful',
    })

    // Set HttpOnly cookie with JWT token
    nextResponse.cookies.set('token', data.token, {
      httpOnly: true,
      secure: false, // Explicitly false for localhost
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Set user data in a readable cookie for client-side access
    nextResponse.cookies.set('user', JSON.stringify(user), {
      httpOnly: false, // Accessible by JS
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return nextResponse
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
