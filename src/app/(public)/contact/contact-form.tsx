'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Reveal } from '@/components/motion'
import { contactFormSchema, type ContactFormData } from '@/lib/validators'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setIsSuccess(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Reveal>
        <div className="border border-border p-8 text-center">
          <p className="technical-text mb-4">Transmission Received</p>
          <p className="text-text text-body-lg mb-6">
            Your message has been dispatched successfully. Expect a response within 24–48 hours.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="technical-text text-primary hover:text-primary-hover transition-colors duration-300"
          >
            Send Another Message
          </button>
        </div>
      </Reveal>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <Reveal>
        <div>
          <label htmlFor="name" className="technical-text mb-2 block">
            Identification / Name
          </label>
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="Your name"
            {...register('name')}
          />
          {errors.name && <p className="technical-text text-error mt-2">{errors.name.message}</p>}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="email" className="technical-text mb-2 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="technical-text text-error mt-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="technical-text mb-2 block">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="input-field"
              placeholder="Project inquiry"
              {...register('subject')}
            />
            {errors.subject && (
              <p className="technical-text text-error mt-2">{errors.subject.message}</p>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div>
          <label htmlFor="message" className="technical-text mb-2 block">
            Details / Message
          </label>
          <textarea
            id="message"
            rows={6}
            className="input-field resize-none"
            placeholder="Tell me about your project..."
            {...register('message')}
          />
          {errors.message && (
            <p className="technical-text text-error mt-2">{errors.message.message}</p>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Transmitting...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                Transmit Data
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>

          {error && <p className="technical-text text-error mt-4">{error}</p>}
        </div>
      </Reveal>
    </form>
  )
}
