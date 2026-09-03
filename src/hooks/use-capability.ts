'use client'

import { useState, useEffect } from 'react'
import type { CapabilityLevel } from '@/types'

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

function getViewportWidth(): number {
  if (typeof window === 'undefined') return 1024
  return window.innerWidth
}

export function useCapability(): CapabilityLevel {
  const [level, setLevel] = useState<CapabilityLevel>('C')

  useEffect(() => {
    const hasWebGL = detectWebGL()
    const dpr = getDevicePixelRatio()
    const width = getViewportWidth()

    if (!hasWebGL || width < 640) {
      setLevel('C') // 2D fallback
    } else if (width < 1280 || dpr > 2) {
      setLevel('B') // Reduced 3D
    } else {
      setLevel('A') // Full 3D
    }
  }, [])

  return level
}

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return prefersReduced
}
