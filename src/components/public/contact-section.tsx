'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/validators'

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid-12 items-start">
      <div className="col-span-12 md:col-span-5">
        <h2 className="heading-h2 mb-6 text-text">Ready to build something exceptional?</h2>
        <p className="body-text-lg text-text-secondary mb-8">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
          part of your vision.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">hello@mdev.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Pakistan</span>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="home-name" className="block text-sm font-medium text-text mb-2">
                Name <span className="text-error">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                id="home-name"
                className={`input-field ${errors.name ? 'border-error' : ''}`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="home-email" className="block text-sm font-medium text-text mb-2">
                Email <span className="text-error">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="home-email"
                className={`input-field ${errors.email ? 'border-error' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="home-subject" className="block text-sm font-medium text-text mb-2">
                Subject
              </label>
              <input
                {...register('subject')}
                type="text"
                id="home-subject"
                className={`input-field ${errors.subject ? 'border-error' : ''}`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-error text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="home-message" className="block text-sm font-medium text-text mb-2">
                Message <span className="text-error">*</span>
              </label>
              <textarea
                {...register('message')}
                id="home-message"
                rows={5}
                className={`input-field resize-none ${errors.message ? 'border-error' : ''}`}
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="text-error text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={isSubmitting ? {} : { scale: 1.01 }}
              whileTap={isSubmitting ? {} : { scale: 0.99 }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-success/10 border border-success/20 rounded-lg p-4"
                >
                  <p className="text-success text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-error/10 border border-error/20 rounded-lg p-4"
                >
                  <p className="text-error text-sm">
                    Failed to send message. Please try again or email me directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  )
}
