'use client'

import { useRef, useState, useEffect } from 'react'
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

export function LiquidText({ text, className, as = 'h1' }: LiquidTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [showFloat, setShowFloat] = useState(false)

  useEffect(() => {
    if (isInView && !prefersReduced) {
      const delay = 200 + text.length * 30 + 600
      const timer = setTimeout(() => setShowFloat(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, prefersReduced, text])

  const Tag = as

  if (prefersReduced) {
    return (
      <Tag className={cn(tagClass[as], className)} style={{ color: '#F1EDE5' }}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag className={cn(tagClass[as], 'relative inline-block whitespace-nowrap', className)}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .liquid-char { animation: none !important }
          .liquid-float { animation: none !important }
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
        className={showFloat ? 'liquid-float' : ''}
        style={
          showFloat
            ? {
                animation: 'liquid-float 4s ease-in-out infinite',
              }
            : undefined
        }
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="liquid-char inline-block"
            style={{
              color: '#F1EDE5',
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
    </Tag>
  )
}
