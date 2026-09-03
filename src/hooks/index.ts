'use client'

import { useState, useEffect, useCallback } from 'react'

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

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId: number
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPosition({ x: lastX, y: lastY })
          rafId = 0
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return position
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrolled = window.scrollY / scrollHeight
          setProgress(Math.min(Math.max(scrolled, 0), 1))
          rafId = 0
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
