'use client'

import { useEffect } from 'react'
import { type ReactNode } from 'react'
import { CustomCursor, CursorGlow } from '@/components/motion'

function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: any = null

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })

    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <CursorGlow />
      {children}
    </SmoothScroll>
  )
}
