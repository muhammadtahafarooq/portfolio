'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinklePhase: number
  twinkleSpeed: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
  maxLife: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    const shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 800)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.15 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        })
      }
    }

    const spawnShootingStar = () => {
      const side = Math.random()
      let x: number, y: number, angle: number

      if (side < 0.5) {
        x = Math.random() * canvas.width * 0.8
        y = Math.random() * canvas.height * 0.3
        angle = Math.PI / 4 + (Math.random() * Math.PI) / 6
      } else {
        x = canvas.width * 0.7 + Math.random() * canvas.width * 0.3
        y = Math.random() * canvas.height * 0.2
        angle = (Math.PI * 3) / 4 + (Math.random() * Math.PI) / 6
      }

      shootingStars.push({
        x,
        y,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      })
    }

    const drawMilkyWay = (time: number) => {
      const gradient = ctx.createLinearGradient(
        canvas.width * 0.2,
        0,
        canvas.width * 0.8,
        canvas.height
      )
      gradient.addColorStop(0, 'rgba(120, 100, 80, 0)')
      gradient.addColorStop(0.3, 'rgba(120, 100, 80, 0.015)')
      gradient.addColorStop(0.5, 'rgba(140, 120, 90, 0.025)')
      gradient.addColorStop(0.7, 'rgba(120, 100, 80, 0.015)')
      gradient.addColorStop(1, 'rgba(120, 100, 80, 0)')

      ctx.save()
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5)
      ctx.rotate(Math.sin(time * 0.0001) * 0.02)
      ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawMilkyWay(time)

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase)
        const currentOpacity = star.opacity * (0.6 + 0.4 * twinkle)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(241, 237, 229, ${currentOpacity})`
        ctx.fill()

        if (star.size > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 168, 95, ${currentOpacity * 0.08})`
          ctx.fill()
        }

        star.y += star.speed
        if (star.y > canvas.height + 5) {
          star.y = -5
          star.x = Math.random() * canvas.width
        }
      }

      if (time - lastShootingStarTime > 3000 + Math.random() * 5000) {
        spawnShootingStar()
        lastShootingStarTime = time
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.life++
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed

        const progress = s.life / s.maxLife
        s.opacity = progress < 0.2 ? progress * 5 : 1 - (progress - 0.2) / 0.8

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, `rgba(241, 237, 229, 0)`)
        gradient.addColorStop(0.7, `rgba(241, 237, 229, ${s.opacity * 0.4})`)
        gradient.addColorStop(1, `rgba(241, 237, 229, ${s.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(241, 237, 229, ${s.opacity})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 168, 95, ${s.opacity * 0.3})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
