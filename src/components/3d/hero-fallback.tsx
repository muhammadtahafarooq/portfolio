'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { useCapability } from '@/hooks/use-capability'

// Lazy load the 3D scene
const Hero3DScene = lazy(() => import('./hero-scene').then((mod) => ({ default: mod.Hero3DScene })))

function Hero3DLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function Hero3DFallback() {
  const level = useCapability()
  const prefersReduced = useReducedMotion()
  const [show3D, setShow3D] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch {
      setWebglSupported(false)
    }

    // Delay 3D mount for smooth page load
    const timer = setTimeout(() => {
      setShow3D(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Level C: Always show 2D fallback
  if (level === 'C' || prefersReduced || !webglSupported || !show3D) {
    return <Fallback2D level={level} />
  }

  return (
    <>
      {/* 2D Fallback (always present as base) */}
      <Fallback2D level={level} />

      {/* 3D Scene (overlaid) */}
      <AnimatePresence>
        {show3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Suspense fallback={<Hero3DLoader />}>
              <Hero3DScene level={level} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Fallback2D({ level }: { level: 'A' | 'B' | 'C' }) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent-primary/10 blur-[120px]"
        animate={
          prefersReduced
            ? {}
            : {
                x: [0, 100, 0],
                y: [0, -50, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ top: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent-secondary/10 blur-[100px]"
        animate={
          prefersReduced
            ? {}
            : {
                x: [0, -80, 0],
                y: [0, 60, 0],
              }
        }
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
      {level === 'A' && !prefersReduced && (
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
