'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useCapability } from '@/hooks/use-capability'
import type { ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const level = useCapability()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  if (level === 'C') {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
