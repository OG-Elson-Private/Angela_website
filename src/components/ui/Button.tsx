import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const baseStyles = 'inline-flex items-center justify-center font-ui font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-teal text-white shadow-button hover:bg-teal-light hover:shadow-button-hover hover:-translate-y-0.5 active:bg-teal-dark active:translate-y-0',
      secondary: 'bg-coral text-white hover:bg-coral-light hover:-translate-y-0.5 active:bg-coral-dark',
      outline: 'border-2 border-teal text-teal bg-transparent hover:bg-teal hover:text-white',
      ghost: 'text-ocean-dark bg-transparent hover:text-teal hover:underline',
      gradient: 'bg-tropical-warmth text-white shadow-coral rounded-full hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button }
