'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Floating particles system
const FloatingParticles = ({ count = 2000 }: { count?: number }) => {
  const mesh = useRef<THREE.Points>(null)
  
  // Generate random particle positions
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const index = i * 3
      temp[index] = (Math.random() - 0.5) * 50     // x
      temp[index + 1] = (Math.random() - 0.5) * 50 // y
      temp[index + 2] = (Math.random() - 0.5) * 50 // z
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      // Gentle rotation and movement
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      mesh.current.rotation.y += 0.002
      
      // Animate individual particles
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.01) * 0.002
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#047857"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Luxury geometric shapes
const GeometricElements = () => {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <group ref={group}>
      {/* Large background spheres */}
      {Array.from({ length: 5 }, (_, i) => (
        <Sphere
          key={i}
          args={[2, 16, 16]}
          position={[
            Math.sin(i * 2) * 15,
            Math.cos(i * 3) * 10,
            -20 + i * -5
          ]}
        >
          <meshStandardMaterial
            color="#047857"
            transparent
            opacity={0.03}
            wireframe
          />
        </Sphere>
      ))}
      
      {/* Floating rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh
          key={`ring-${i}`}
          position={[
            Math.sin(i * 4) * 20,
            Math.cos(i * 2) * 15,
            -30 + i * -10
          ]}
          rotation={[i * 0.5, i * 0.3, 0]}
        >
          <torusGeometry args={[3, 0.1, 8, 32]} />
          <meshStandardMaterial
            color="#10b981"
            transparent
            opacity={0.1}
            emissive="#047857"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Gradient mesh background
const GradientMesh = () => {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      // Gentle wave animation
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -50]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshStandardMaterial
        color="#000000"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface AnimatedBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'dramatic'
  particleCount?: number
  className?: string
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  intensity = 'medium',
  particleCount = 2000,
  className = "fixed inset-0 -z-10"
}) => {
  const getParticleCount = () => {
    switch (intensity) {
      case 'subtle': return Math.floor(particleCount * 0.5)
      case 'dramatic': return Math.floor(particleCount * 1.5)
      default: return particleCount
    }
  }

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#047857" />
        
        {/* Background elements */}
        <GradientMesh />
        <GeometricElements />
        <FloatingParticles count={getParticleCount()} />
        
        {/* Subtle fog */}
        <fog attach="fog" args={['#000000', 30, 100]} />
      </Canvas>
      
      {/* CSS gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />
    </motion.div>
  )
}

export default AnimatedBackground 