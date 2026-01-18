# User Management Frontend

A Next.js 15 App Router application with React 19 and Tailwind CSS for user management, featuring authentication, RBAC, and CRUD operations.

## Features

- **Authentication**: Login page with JWT token stored in secure cookies
- **Middleware**: Route protection for `/dashboard` and `/users` routes
- **CRUD Operations**: Full user management (Create, Read, Update, Delete)
- **RBAC**: Role-Based Access Control - ADMIN-only features
- **API Integration**: Integration with Spring Boot backend at `http://localhost:8080`
- **Clean UI**: Modern, responsive design with Tailwind CSS

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios for API calls
- HttpOnly cookies for secure JWT storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-FE
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your backend API URL if different:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── dashboard/       # Dashboard page (protected)
│   ├── login/           # Login page
│   ├── users/           # Users management page (ADMIN only)
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page (redirects to login)
├── components/
│   ├── UserTable.tsx    # User list table component
│   └── UserFormModal.tsx # User create/edit form modal
├── lib/
│   ├── api.ts           # Axios instance with interceptors
│   ├── auth.ts          # Authentication utilities
│   └── services.ts      # API service functions
├── types/
│   └── auth.ts          # TypeScript type definitions
└── middleware.ts        # Route protection middleware
```

## Features in Detail

### 1. Authentication
- Login form with username and password
- JWT token stored in secure HttpOnly cookies (server-side)
- Automatic redirect to dashboard on successful login
- Cookies sent automatically with every API request

### 2. Middleware
- Protects `/dashboard` and `/users` routes from unauthenticated access
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` to `/dashboard`

### 3. CRUD Operations
- **List Users**: Table view with all users (ADMIN only)
- **Create User**: Form to create new users (ADMIN only)
- **Edit User**: Form to update existing users (ADMIN only)
- **Delete User**: Delete users with confirmation (ADMIN only)

### 4. Role-Based Access Control (RBAC)
- ADMIN role: Full access to user management
- USER role: Access to dashboard only
- UI elements hidden/disabled based on user role
- Backend should validate permissions on API calls

### 5. API Integration
- Axios configured to communicate with Spring Boot backend
- Automatic JWT token inclusion in request headers
- Error handling with automatic logout on 401 responses
- Base URL configurable via environment variable

## API Endpoints Expected

The frontend expects the following API endpoints from the Spring Boot backend:

### Authentication
- `POST /api/auth/login` - Login with username and password
  - Request: `{ username: string, password: string }`
  - Response: `{ token: string, user: User }`

- `POST /api/auth/logout` - Logout current user

- `GET /api/auth/me` - Get current user profile

### Users (ADMIN only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  - Request: `{ username, email, password, role }`
- `PUT /api/users/:id` - Update user
  - Request: `{ username?, email?, password?, role? }`
- `DELETE /api/users/:id` - Delete user

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Default Test Credentials

The login page displays test credentials:
- Admin: `admin` / `admin123`
- User: `user` / `user123`

(These should be configured in your Spring Boot backend)

## Security Features

- Secure HttpOnly cookie storage for JWT tokens (prevents XSS attacks)
- SameSite and Secure cookies in production
- Server-side cookie management
- Protected routes with middleware
- RBAC implementation on both UI and API level

## License

MIT