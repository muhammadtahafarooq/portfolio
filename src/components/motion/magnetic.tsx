'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion, useIsDesktop } from '@/hooks'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = 'button',
  href,
  onClick,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || prefersReduced || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const style = isDesktop && !prefersReduced ? { x: springX, y: springY } : {}

  const Component = motion[as]

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      type={as === 'button' ? type : undefined}
      disabled={disabled}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </Component>
  )
}

interface CursorGlowProps {
  className?: string
  color?: string
  size?: number
  blur?: number
}

export function CursorGlow({
  className,
  color = 'rgba(214, 168, 95, 0.15)',
  size = 400,
  blur = 100,
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  if (prefersReduced || !isDesktop) return null

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none fixed z-0 ${className ?? ''}`}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  speed?: number
  delay?: number
  range?: number
}

export function FloatingElement({
  children,
  className,
  speed = 2,
  delay = 0,
  range = 10,
}: FloatingElementProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -range, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
