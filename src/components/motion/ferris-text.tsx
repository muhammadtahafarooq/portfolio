'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FerrisTextProps {
  text: string
  className?: string
}

export function FerrisText({ text, className = '' }: FerrisTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`inline-flex ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          style={{ transformOrigin: 'center bottom' }}
          animate={
            isHovered
              ? {
                  y: [0, -14, -18, -14, 0],
                  rotateX: [0, 15, 0, -15, 0],
                  scale: [1, 1.15, 1.2, 1.15, 1],
                }
              : { y: 0, rotateX: 0, scale: 1 }
          }
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
            delay: i * 0.04,
            times: [0, 0.3, 0.5, 0.7, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
