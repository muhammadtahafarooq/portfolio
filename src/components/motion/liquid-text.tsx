'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { cn } from '@/lib/utils'

interface LiquidTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

const tagClass = {
  h1: 'heading-h1',
  h2: 'heading-h2',
  h3: 'heading-h3',
} as const

const gradientStyle = {
  background: 'linear-gradient(135deg, #F1EDE5 0%, #D6A85F 50%, #F1EDE5 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const shimmerStyle = {
  background:
    'linear-gradient(90deg, transparent 0%, rgba(241,237,229,0.15) 40%, rgba(214,168,95,0.3) 50%, rgba(241,237,229,0.15) 60%, transparent 100%)',
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'liquid-shimmer 4s ease-in-out infinite',
}

export function LiquidText({ text, className, as = 'h1' }: LiquidTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const Tag = as

  if (prefersReduced) {
    return (
      <Tag className={cn(tagClass[as], className)} style={gradientStyle}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag className={cn(tagClass[as], 'relative inline-block', className)}>
      <style>{`
        @keyframes liquid-float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-6px) }
        }
        @keyframes liquid-shimmer {
          0% { background-position: 200% center }
          100% { background-position: -200% center }
        }
        @media (prefers-reduced-motion: reduce) {
          .liquid-char { animation: none !important }
          .liquid-shimmer-overlay { animation: none !important }
        }
      `}</style>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.2,
            },
          },
        }}
        aria-label={text}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="liquid-char inline-block"
            style={{
              ...gradientStyle,
              animation: `liquid-float 3s ease-in-out ${(i * 0.15) % 2}s infinite`,
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                rotateX: -40,
                filter: 'blur(4px)',
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
      <span
        className="liquid-shimmer-overlay pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
        style={shimmerStyle}
      >
        {text}
      </span>
    </Tag>
  )
}
