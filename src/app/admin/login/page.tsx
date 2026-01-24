'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(
    error ? 'Invalid credentials' : null
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setLoginError('Invalid email or password')
        setIsLoading(false)
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setLoginError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      {/* Error Message */}
      {loginError && (
        <div
          className="p-4 bg-coral/10 border border-coral/30 rounded-lg text-coral text-sm"
          role="alert"
        >
          {loginError}
        </div>
      )}

      {/* Email */}
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
        required
        autoComplete="email"
        autoFocus
      />

      {/* Password */}
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        autoComplete="current-password"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 animate-pulse">
      <div className="h-12 bg-gray-200 rounded-lg" />
      <div className="h-12 bg-gray-200 rounded-lg" />
      <div className="h-12 bg-gray-200 rounded-lg" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-light px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-semibold text-ocean-dark mb-2">
            Admin Login
          </h1>
          <p className="font-body text-gray-warm">
            Sign in to manage testimonials
          </p>
        </div>

        {/* Login Form wrapped in Suspense */}
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        {/* Back to site */}
        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-teal hover:text-teal-dark font-body text-sm underline underline-offset-4"
          >
            Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
