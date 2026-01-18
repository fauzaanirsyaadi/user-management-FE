import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'User Management System',
  description: 'A Next.js 15 User Management Application with React 19',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
