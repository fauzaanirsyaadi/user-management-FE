import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
    })

    // Clear cookies
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    response.cookies.set('user', '', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error: any) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
