'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from './Button'
import type { ServiceType } from '@/lib/validations/testimonial'

// Lazy load Modal and TestimonialForm for better performance
const Modal = dynamic(() => import('./Modal').then((mod) => mod.Modal), {
  ssr: false,
})
const TestimonialForm = dynamic(
  () => import('@/components/forms/TestimonialForm').then((mod) => mod.TestimonialForm),
  { ssr: false }
)

export interface LeaveReviewButtonProps extends Omit<ButtonProps, 'onClick'> {
  defaultService?: ServiceType
  children?: React.ReactNode
  modalTitle?: string
}

/**
 * Reusable button component that opens the testimonial form modal
 * - Can pre-select a service type
 * - Supports all Button variants and sizes
 * - Lazy loads Modal and Form for performance
 */
export function LeaveReviewButton({
  defaultService,
  children = 'Leave a Review',
  modalTitle = 'Share Your Experience',
  variant = 'primary',
  size = 'md',
  className,
  ...buttonProps
}: LeaveReviewButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={openModal}
        {...buttonProps}
      >
        {children}
      </Button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          size="md"
        >
          <TestimonialForm
            defaultService={defaultService}
            onSuccess={closeModal}
          />
        </Modal>
      )}
    </>
  )
}

export default LeaveReviewButton
