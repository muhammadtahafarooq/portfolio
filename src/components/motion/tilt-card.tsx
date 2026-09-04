'use client'

import { useRef, useCallback, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

interface Transform {
  rotateX: number
  rotateY: number
  shineX: number
  shineY: number
}

export function TiltCard({ children, className, maxTilt = 15 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [transform, setTransform] = useState<Transform>({
    rotateX: 0,
    rotateY: 0,
    shineX: 50,
    shineY: 50,
  })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateY = (mouseX / (rect.width / 2)) * maxTilt
      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt

      const shineX = ((e.clientX - rect.left) / rect.width) * 100
      const shineY = ((e.clientY - rect.top) / rect.height) * 100

      setTransform({ rotateX, rotateY, shineX, shineY })
    },
    [maxTilt, prefersReduced]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTransform({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const prefersReducedStyle = prefersReduced
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        willChange: 'transform',
      }

  const shineStyle = prefersReduced
    ? {}
    : {
        background: `radial-gradient(circle at ${transform.shineX}% ${transform.shineY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...prefersReducedStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={shineStyle}
      />
    </div>
  )
}
