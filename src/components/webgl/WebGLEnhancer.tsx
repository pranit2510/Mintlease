'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Subtle floating orbs
const FloatingOrbs = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <Sphere
            args={[0.2 + Math.random() * 0.3, 16, 16]}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10 - 5
            ]}
          >
            <MeshDistortMaterial
              color="#047857"
              transparent
              opacity={0.1 + Math.random() * 0.1}
              distort={0.2}
              speed={1 + Math.random()}
              roughness={0.4}
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Wireframe geometry backdrop
const WireframeBackdrop = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[15, 10, 10]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#047857"
        transparent
        opacity={0.03}
        wireframe
      />
    </mesh>
  )
}

// Ambient particles
const AmbientParticles = () => {
  const particlesRef = useRef<THREE.Points>(null)
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((_state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
    }
  })

  return (
    <Points 
      ref={particlesRef} 
      positions={positions} 
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial
        size={0.02}
        color="#10b981"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

interface WebGLEnhancerProps {
  variant?: 'subtle' | 'medium' | 'dramatic'
  className?: string
  enableParticles?: boolean
  enableOrbs?: boolean
  enableWireframe?: boolean
}

const WebGLEnhancer: React.FC<WebGLEnhancerProps> = ({
  variant = 'subtle',
  className = "absolute inset-0 pointer-events-none -z-10",
  enableParticles = true,
  enableOrbs = true,
  enableWireframe = true
}) => {
  const getIntensity = () => {
    switch (variant) {
      case 'subtle': return { orbs: 3, opacity: 0.3 }
      case 'dramatic': return { orbs: 8, opacity: 0.8 }
      default: return { orbs: 5, opacity: 0.5 }
    }
  }

  const { orbs, opacity } = getIntensity()

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Minimal lighting for subtlety */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.2} color="#047857" />
        
        {/* Conditional elements based on props */}
        {enableWireframe && <WireframeBackdrop />}
        {enableOrbs && <FloatingOrbs count={orbs} />}
        {enableParticles && <AmbientParticles />}
        
        {/* Atmospheric fog */}
        <fog attach="fog" args={['#000000', 15, 50]} />
      </Canvas>
    </motion.div>
  )
}

export default WebGLEnhancer 