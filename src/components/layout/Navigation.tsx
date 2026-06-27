'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import type { NavLink } from '@/types'

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Cuisine', href: '/cuisine' },
  { label: 'Stay', href: '/hebergement' },
  { label: 'Ask Angela', href: '/ask-angela' },
  { label: 'Contact', href: '/contact' },
]

interface NavigationProps {
  isScrolled: boolean
}

export function Navigation({ isScrolled }: NavigationProps) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

        return (
          <li key={link.href} className="relative group">
            <Link
              href={link.href}
              className={cn(
                'px-4 py-2 font-ui text-sm font-medium rounded-lg transition-colors duration-200',
                isScrolled
                  ? isActive
                    ? 'text-teal'
                    : 'text-ocean-dark hover:text-teal hover:bg-teal/5'
                  : isActive
                    ? 'text-coral'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>

            {/* Dropdown for children */}
            {link.children && (
              <ul className="absolute top-full left-0 mt-1 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 min-w-[180px]">
                {link.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={cn(
                        'block px-4 py-2 font-ui text-sm transition-colors duration-200',
                        pathname === child.href
                          ? 'text-teal bg-teal/5'
                          : 'text-ocean-dark hover:text-teal hover:bg-teal/5'
                      )}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-ocean-dark/50 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 w-[280px] bg-sand-light z-50 transform transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-light">
            <span className="font-script text-2xl text-coral">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-ocean-dark hover:bg-gray-light rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'block px-4 py-3 font-ui text-base font-medium rounded-lg transition-colors duration-200',
                        isActive
                          ? 'text-teal bg-teal/10'
                          : 'text-ocean-dark hover:text-teal hover:bg-teal/5'
                      )}
                    >
                      {link.label}
                    </Link>

                    {/* Sub-links */}
                    {link.children && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                'block px-4 py-2 font-ui text-sm transition-colors duration-200',
                                pathname === child.href
                                  ? 'text-teal'
                                  : 'text-gray-warm hover:text-teal'
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer CTA */}
          <div className="p-4 border-t border-gray-light">
            <Button variant="primary" size="md" className="w-full" asChild>
              <Link href="/contact" onClick={onClose}>
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
