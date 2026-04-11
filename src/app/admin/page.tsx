'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { StarRatingDisplay } from '@/components/ui/StarRating'

import { serviceLabels, type ServiceType } from '@/lib/validations/testimonial'

type TestimonialStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface Testimonial {
  id: string
  name: string
  email: string
  location: string | null
  service: ServiceType
  rating: number
  text: string
  status: TestimonialStatus
  createdAt: string
}

interface TestimonialsResponse {
  testimonials: Testimonial[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
  counts: {
    PENDING: number
    APPROVED: number
    REJECTED: number
  }
}

const SERVICE_LABELS: Record<ServiceType, string> = serviceLabels

const STATUS_STYLES: Record<TestimonialStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
}

export default function AdminDashboardPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [counts, setCounts] = useState({ PENDING: 0, APPROVED: 0, REJECTED: 0 })
  const [activeFilter, setActiveFilter] = useState<TestimonialStatus | 'ALL'>('PENDING')
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'cuisine' | 'accommodation'>('ALL')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [authStatus, router])

  // Fetch testimonials
  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (activeFilter !== 'ALL') params.set('status', activeFilter)
      if (activeCategory !== 'ALL') params.set('category', activeCategory)
      const queryString = params.toString()
      const response = await fetch(`/api/admin/testimonials${queryString ? `?${queryString}` : ''}`)

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch testimonials')
      }

      const data: TestimonialsResponse = await response.json()
      setTestimonials(data.testimonials)
      setCounts(data.counts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [activeFilter, activeCategory, router])

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchTestimonials()
    }
  }, [authStatus, fetchTestimonials])

  // Update testimonial status
  const updateStatus = async (id: string, newStatus: TestimonialStatus) => {
    setActionLoading(id)

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Refresh the list
      await fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setActionLoading(null)
    }
  }

  // Delete testimonial
  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    setActionLoading(id)

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }

      // Refresh the list
      await fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setActionLoading(null)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Loading state
  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4" />
          <p className="text-gray-warm">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (authStatus === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-ocean-dark">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-warm mt-1">
                Manage testimonials
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-warm">
                {session?.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/api/auth/signout')}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
            <p className="text-sm text-gray-warm mb-1">Pending</p>
            <p className="text-3xl font-semibold text-amber-600">{counts.PENDING}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
            <p className="text-sm text-gray-warm mb-1">Approved</p>
            <p className="text-3xl font-semibold text-emerald-600">{counts.APPROVED}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
            <p className="text-sm text-gray-warm mb-1">Rejected</p>
            <p className="text-3xl font-semibold text-red-600">{counts.REJECTED}</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['ALL', 'cuisine', 'accommodation'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-ocean-dark text-white'
                  : 'bg-white text-gray-warm hover:bg-sand border border-sand'
              }`}
            >
              {cat === 'ALL' ? 'All Services' : cat === 'cuisine' ? 'Cuisine' : 'Accommodation'}
            </button>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-teal text-white'
                  : 'bg-white text-gray-warm hover:bg-sand border border-sand'
              }`}
            >
              {filter === 'ALL' ? 'All' : filter.charAt(0) + filter.slice(1).toLowerCase()}
              {filter !== 'ALL' && ` (${counts[filter]})`}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-coral/10 border border-coral/30 rounded-lg text-coral">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Testimonials List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal mx-auto mb-4" />
            <p className="text-gray-warm">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-sand">
            <p className="text-gray-warm">No testimonials found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-sand"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-ocean-dark">
                        {testimonial.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[testimonial.status]}`}>
                        {testimonial.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-warm">
                      {testimonial.email}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-seafoam/30 text-teal-dark text-xs rounded-lg mb-1">
                      {SERVICE_LABELS[testimonial.service]}
                    </span>
                    <p className="text-xs text-gray-warm">
                      {formatDate(testimonial.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <StarRatingDisplay rating={testimonial.rating as 1 | 2 | 3 | 4 | 5} size="sm" />
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {testimonial.text}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-sand">
                  {testimonial.status !== 'APPROVED' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateStatus(testimonial.id, 'APPROVED')}
                      disabled={actionLoading === testimonial.id}
                      isLoading={actionLoading === testimonial.id}
                    >
                      Approve
                    </Button>
                  )}
                  {testimonial.status !== 'REJECTED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(testimonial.id, 'REJECTED')}
                      disabled={actionLoading === testimonial.id}
                    >
                      Reject
                    </Button>
                  )}
                  {testimonial.status !== 'PENDING' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(testimonial.id, 'PENDING')}
                      disabled={actionLoading === testimonial.id}
                    >
                      Reset to Pending
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTestimonial(testimonial.id)}
                    disabled={actionLoading === testimonial.id}
                    className="text-coral border-coral hover:bg-coral/10 ml-auto"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
