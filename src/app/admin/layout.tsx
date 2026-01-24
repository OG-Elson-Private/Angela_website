import { AuthProvider } from '@/components/providers/AuthProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Chef Angela',
  description: 'Administration panel for Chef Angela website',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
