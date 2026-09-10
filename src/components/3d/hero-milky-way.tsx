'use client'

import { useEffect, useRef } from 'react'

export function HeroMilkyWay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }

    const draw = (time: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.65
      const cy = h * 0.35

      const bandGradient = ctx.createLinearGradient(
        cx - w * 0.4,
        cy - h * 0.3,
        cx + w * 0.4,
        cy + h * 0.3
      )
      bandGradient.addColorStop(0, 'rgba(140, 110, 80, 0)')
      bandGradient.addColorStop(0.2, 'rgba(160, 130, 90, 0.06)')
      bandGradient.addColorStop(0.4, 'rgba(180, 150, 100, 0.10)')
      bandGradient.addColorStop(0.5, 'rgba(200, 170, 110, 0.12)')
      bandGradient.addColorStop(0.6, 'rgba(180, 150, 100, 0.10)')
      bandGradient.addColorStop(0.8, 'rgba(160, 130, 90, 0.06)')
      bandGradient.addColorStop(1, 'rgba(140, 110, 80, 0)')

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.sin(time * 0.00008) * 0.04 + 0.15)
      ctx.translate(-cx, -cy)
      ctx.fillStyle = bandGradient
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      for (let i = 0; i < 8; i++) {
        const nx = cx + Math.sin(time * 0.0001 + i * 1.2) * w * 0.2
        const ny = cy + Math.cos(time * 0.00008 + i * 0.9) * h * 0.15
        const r = Math.min(w, h) * (0.08 + i * 0.02)
        const colors = [
          'rgba(80, 50, 120,',
          'rgba(40, 60, 130,',
          'rgba(120, 80, 50,',
          'rgba(60, 90, 110,',
        ]
        const c = colors[i % colors.length]
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, r)
        grad.addColorStop(0, `${c}0.04)`)
        grad.addColorStop(0.6, `${c}0.02)`)
        grad.addColorStop(1, `${c}0)`)
        ctx.fillStyle = grad
        ctx.fillRect(nx - r, ny - r, r * 2, r * 2)
      }

      for (let i = 0; i < 300; i++) {
        const sx = (Math.sin(i * 127.1 + 43.7) * 0.5 + 0.5) * w
        const sy = (Math.cos(i * 269.5 + 17.3) * 0.5 + 0.5) * h
        const sz = (Math.sin(i * 311.7 + 71.9) * 0.5 + 0.5) * 1.5 + 0.3
        const dist = Math.sqrt((sx - cx) ** 2 + (sy - cy) ** 2)
        const maxDist = Math.sqrt(w * w + h * h) * 0.5
        const inBand = dist < maxDist * 0.6 ? 1.0 : 0.3
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + i * 0.5)
        const opacity = (0.3 + twinkle * 0.5) * inBand

        ctx.beginPath()
        ctx.arc(sx, sy, sz, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(241, 237, 229, ${opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
