'use client'

import { useEffect, useRef } from 'react'

interface StarFieldProps {
  intensity?: 'low' | 'standard' | 'high'
}

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

interface NebulaPatch {
  x: number
  y: number
  radius: number
  color: string
  driftX: number
  driftY: number
  phase: number
}

const INTENSITY_CONFIG = {
  low: { starCount: 800, shootingStarInterval: [8000, 15000] as const, dustDensity: 200 },
  standard: { starCount: 1500, shootingStarInterval: [2000, 6000] as const, dustDensity: 400 },
  high: { starCount: 2200, shootingStarInterval: [1500, 4000] as const, dustDensity: 600 },
} as const

const WARM_TONE = 'rgba(212, 168, 95,'
const COOL_TONE = 'rgba(180, 160, 220,'
const NEUTRAL_TONE = 'rgba(241, 237, 229,'

function createStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.7 + 0.3,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.15 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    })
  }
  return stars
}

function createNebulae(width: number, height: number): NebulaPatch[] {
  return [
    {
      x: width * 0.3,
      y: height * 0.4,
      radius: Math.min(width, height) * 0.3,
      color: 'rgba(80, 40, 120,',
      driftX: 0.02,
      driftY: 0.01,
      phase: 0,
    },
    {
      x: width * 0.7,
      y: height * 0.3,
      radius: Math.min(width, height) * 0.25,
      color: 'rgba(30, 60, 120,',
      driftX: -0.015,
      driftY: 0.012,
      phase: Math.PI * 0.7,
    },
    {
      x: width * 0.5,
      y: height * 0.7,
      radius: Math.min(width, height) * 0.2,
      color: 'rgba(120, 80, 50,',
      driftX: 0.01,
      driftY: -0.018,
      phase: Math.PI * 1.3,
    },
  ]
}

function createDust(
  width: number,
  height: number,
  count: number
): { x: number; y: number; opacity: number }[] {
  const dust: { x: number; y: number; opacity: number }[] = []
  for (let i = 0; i < count; i++) {
    dust.push({
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: Math.random() * 0.04 + 0.01,
    })
  }
  return dust
}

function spawnShootingStar(width: number, height: number): ShootingStar {
  const fromTop = Math.random() < 0.5
  const x = fromTop ? Math.random() * width * 0.8 : width * 0.6 + Math.random() * width * 0.4
  const y = fromTop ? Math.random() * height * 0.25 : Math.random() * height * 0.15
  const angle = Math.PI / 4 + (Math.random() * Math.PI) / 6

  return {
    x,
    y,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 8 + 6,
    angle,
    opacity: 1,
    life: 0,
    maxLife: Math.random() * 40 + 30,
  }
}

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], width: number, height: number) {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i]
    star.twinklePhase += star.twinkleSpeed
    const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase)
    const currentOpacity = star.opacity * (0.6 + 0.4 * twinkle)

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `${NEUTRAL_TONE}${currentOpacity})`
    ctx.fill()

    if (star.size > 1) {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `${WARM_TONE}${currentOpacity * 0.08})`
      ctx.fill()
    }

    star.y += star.speed
    if (star.y > height + 5) {
      star.y = -5
      star.x = Math.random() * width
    }
  }
}

function drawMilkyWay(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const gradient = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, height)
  gradient.addColorStop(0, 'rgba(120, 100, 80, 0)')
  gradient.addColorStop(0.3, 'rgba(140, 120, 90, 0.02)')
  gradient.addColorStop(0.5, 'rgba(160, 140, 100, 0.04)')
  gradient.addColorStop(0.7, 'rgba(140, 120, 90, 0.02)')
  gradient.addColorStop(1, 'rgba(120, 100, 80, 0)')

  ctx.save()
  ctx.translate(width * 0.5, height * 0.5)
  ctx.rotate(Math.sin(time * 0.0001) * 0.03)
  ctx.translate(-width * 0.5, -height * 0.5)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}

function drawNebulae(ctx: CanvasRenderingContext2D, nebulae: NebulaPatch[], time: number) {
  for (const nebula of nebulae) {
    nebula.phase += 0.001
    const offsetX = Math.sin(nebula.phase) * 20
    const offsetY = Math.cos(nebula.phase * 0.7) * 15
    const cx = nebula.x + offsetX + nebula.driftX * time
    const cy = nebula.y + offsetY + nebula.driftY * time

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, nebula.radius)
    gradient.addColorStop(0, `${nebula.color}0.03)`)
    gradient.addColorStop(0.5, `${nebula.color}0.015)`)
    gradient.addColorStop(1, `${nebula.color}0)`)

    ctx.fillStyle = gradient
    ctx.fillRect(cx - nebula.radius, cy - nebula.radius, nebula.radius * 2, nebula.radius * 2)
  }
}

function drawShootingStars(ctx: CanvasRenderingContext2D, shootingStars: ShootingStar[]) {
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
    gradient.addColorStop(0, `${NEUTRAL_TONE}0)`)
    gradient.addColorStop(0.6, `${WARM_TONE}${s.opacity * 0.5})`)
    gradient.addColorStop(1, `${NEUTRAL_TONE}${s.opacity})`)

    ctx.beginPath()
    ctx.moveTo(tailX, tailY)
    ctx.lineTo(s.x, s.y)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = `${NEUTRAL_TONE}${s.opacity})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(s.x, s.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = `${WARM_TONE}${s.opacity * 0.25})`
    ctx.fill()
  }
}

function drawDust(
  ctx: CanvasRenderingContext2D,
  dust: { x: number; y: number; opacity: number }[]
) {
  for (const d of dust) {
    ctx.beginPath()
    ctx.arc(d.x, d.y, 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `${NEUTRAL_TONE}${d.opacity})`
    ctx.fill()
  }
}

export function StarField({ intensity = 'standard' }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = INTENSITY_CONFIG[intensity]
    let animationId: number
    let stars: Star[] = []
    let nebulae: NebulaPatch[] = []
    let dust: { x: number; y: number; opacity: number }[] = []
    const shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0
    let nextShootingStarDelay =
      config.shootingStarInterval[0] +
      Math.random() * (config.shootingStarInterval[1] - config.shootingStarInterval[0])

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = createStars(canvas.width, canvas.height, config.starCount)
      nebulae = createNebulae(canvas.width, canvas.height)
      dust = createDust(canvas.width, canvas.height, config.dustDensity)
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawMilkyWay(ctx, canvas.width, canvas.height, time)
      drawNebulae(ctx, nebulae, time)
      drawDust(ctx, dust)
      drawStars(ctx, stars, canvas.width, canvas.height)

      if (intensity !== 'low') {
        if (time - lastShootingStarTime > nextShootingStarDelay) {
          shootingStars.push(spawnShootingStar(canvas.width, canvas.height))
          lastShootingStarTime = time
          nextShootingStarDelay =
            config.shootingStarInterval[0] +
            Math.random() * (config.shootingStarInterval[1] - config.shootingStarInterval[0])
        }
        drawShootingStars(ctx, shootingStars)
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
  }, [intensity])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
