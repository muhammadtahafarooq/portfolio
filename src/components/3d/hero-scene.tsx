'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion, useMousePosition, useIsDesktop } from '@/hooks'

function CameraController() {
  const { camera } = useThree()
  const mouse = useMousePosition()
  const isDesktop = useIsDesktop()
  const prefersReduced = useReducedMotion()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5))

  useFrame((state) => {
    if (prefersReduced) return

    const time = state.clock.getElapsedTime()

    // Idle camera movement
    const idleX = Math.sin(time * 0.1) * 0.1
    const idleY = Math.cos(time * 0.08) * 0.05

    // Mouse influence (desktop only)
    let mouseX = 0
    let mouseY = 0
    if (isDesktop) {
      mouseX = (mouse.x / window.innerWidth - 0.5) * 0.5
      mouseY = (mouse.y / window.innerHeight - 0.5) * 0.3
    }

    targetPosition.current.set(idleX + mouseX, idleY + mouseY, 5)

    camera.position.lerp(targetPosition.current, 0.02)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function FloatingCube({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const prefersReduced = useReducedMotion()

  useFrame((state) => {
    if (!meshRef.current || prefersReduced) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time * speed) * 0.3
    meshRef.current.rotation.y = Math.cos(time * speed * 0.7) * 0.3
  })

  return (
    <Float
      speed={prefersReduced ? 0 : 1.5}
      rotationIntensity={prefersReduced ? 0 : 0.3}
      floatIntensity={prefersReduced ? 0 : 0.5}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial color={color} transparent opacity={0.6} distort={0.2} speed={speed} />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const prefersReduced = useReducedMotion()

  useFrame((state) => {
    if (!meshRef.current || prefersReduced) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time * speed) * 0.4
    meshRef.current.rotation.z = Math.cos(time * speed * 0.6) * 0.4
  })

  return (
    <Float
      speed={prefersReduced ? 0 : 1.2}
      rotationIntensity={prefersReduced ? 0 : 0.4}
      floatIntensity={prefersReduced ? 0 : 0.6}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial color={color} transparent opacity={0.5} distort={0.15} speed={speed} />
      </mesh>
    </Float>
  )
}

function Particles({ count = 50 }: { count?: number }) {
  const prefersReduced = useReducedMotion()
  const mesh = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!mesh.current || prefersReduced) return
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.y = time * 0.02
    mesh.current.rotation.x = time * 0.01
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8B5CF6" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene({ level }: { level: 'A' | 'B' }) {
  return (
    <>
      <CameraController />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Main directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      {/* Violet accent light */}
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#8B5CF6" distance={10} />

      {/* Secondary accent light */}
      <pointLight position={[3, -2, -3]} intensity={0.4} color="#06B6D4" distance={8} />

      {/* Floating geometric structures */}
      <FloatingCube position={[-2, 1, -1]} scale={0.8} speed={0.5} color="#8B5CF6" />
      <FloatingCube position={[2.5, -0.5, -2]} scale={0.6} speed={0.3} color="#06B6D4" />
      <FloatingOctahedron position={[0, 1.5, -1.5]} scale={0.7} speed={0.4} color="#8B5CF6" />
      <FloatingOctahedron position={[-1.5, -1, -2.5]} scale={0.5} speed={0.6} color="#06B6D4" />

      {/* Additional geometry for Level A */}
      {level === 'A' && (
        <>
          <FloatingCube position={[1.5, 0.8, -3]} scale={0.4} speed={0.7} color="#8B5CF6" />
          <FloatingOctahedron
            position={[-2.5, -0.3, -3]}
            scale={0.35}
            speed={0.8}
            color="#06B6D4"
          />
          <Particles count={80} />
        </>
      )}

      {/* Fewer particles for Level B */}
      {level === 'B' && <Particles count={30} />}
    </>
  )
}

interface Hero3DSceneProps {
  level: 'A' | 'B' | 'C'
}

export function Hero3DScene({ level }: Hero3DSceneProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (level === 'C' || !isReady) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={level === 'A' ? [1, 2] : [1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: level === 'A',
          alpha: true,
          powerPreference: level === 'A' ? 'high-performance' : 'low-power',
        }}
      >
        <Scene level={level} />
      </Canvas>
    </div>
  )
}
