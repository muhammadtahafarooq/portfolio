'use client'

import { motion } from 'framer-motion'
import { useCapability } from '@/hooks/use-capability'

export function Hero3DFallback() {
  const level = useCapability()

  if (level === 'C') {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent-primary/10 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ top: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent-secondary/10 blur-[100px]"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ bottom: '20%', left: '5%' }}
      />

      {/* Grid lines */}
      {level === 'A' && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      )}

      {/* Floating particles */}
      {level === 'A' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-primary/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
              style={{
                left: `${15 + i * 15}%`,
                top: '60%',
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
