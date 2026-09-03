'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
  spring?: boolean
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  spring = true,
}: ParallaxProps) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const multiplier = direction === 'up' ? -1 : 1
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 100 * multiplier, speed * -100 * multiplier]
  )
  const y = useSpring(yRaw, { stiffness: 100, damping: 30 })

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ src, alt, className, speed = 0.2 }: ParallaxImageProps) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yRaw = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])
  const y = useSpring(yRaw, { stiffness: 100, damping: 30 })
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 30 })

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden ${className ?? ''}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-[1.05]"
        style={{ y, scale }}
      />
    </div>
  )
}
