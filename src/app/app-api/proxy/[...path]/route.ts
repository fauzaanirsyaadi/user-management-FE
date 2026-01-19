import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT')
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE')
}

async function handleRequest(request: NextRequest, method: string) {
  try {
    // Get the path from the URL
    const url = new URL(request.url)
    const pathSegments = url.pathname.split('/app-api/proxy/')
    const apiPath = pathSegments[1] || ''

    // Get token from HttpOnly cookie
    const token = request.cookies.get('token')?.value

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    }

    // Add body for POST, PUT requests
    if (method === 'POST' || method === 'PUT') {
      const body = await request.text()
      if (body) {
        options.body = body
      }
    }

    // Forward request to backend
    const backendUrl = `${API_BASE_URL}/${apiPath}${url.search}`
    const response = await fetch(backendUrl, options)

    // Get response data
    const contentType = response.headers.get('content-type')
    let data
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Return response with same status
    // 204 No Content cannot have a body in Next.js response constructor
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
