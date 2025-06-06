'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, MeshDistortMaterial, Sphere, Float, Points } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D "M" Letter Component
const Letter3D = ({ 
  position, 
  text, 
  color = "#047857",
  isHovered = false 
}: { 
  position: [number, number, number]
  text: string
  color?: string
  isHovered?: boolean
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      
      // Rotation based on hover
      meshRef.current.rotation.y = isHovered 
        ? Math.sin(state.clock.elapsedTime * 3) * 0.2
        : Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={1.5}
        font="/fonts/Inter-Bold.woff"
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <MeshDistortMaterial
          color={color}
          distort={isHovered ? 0.3 : 0.1}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Text>
    </Float>
  )
}

// Luxury backdrop sphere
const BackdropSphere = ({ isHovered = false }: { isHovered?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((_state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
      meshRef.current.scale.setScalar(isHovered ? 1.1 : 1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#047857"
        transparent
        opacity={0.1}
        distort={0.4}
        speed={1.5}
        roughness={0.8}
        wireframe
      />
    </Sphere>
  )
}

// Floating particles around logo
const LogoParticles = () => {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      const radius = 3 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((_state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005
    }
  })

  return (
    <Points 
      ref={particlesRef} 
      positions={particlePositions} 
      stride={3} 
      frustumCulled={false}
    >
      <pointsMaterial
        size={0.05}
        color="#10b981"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  )
}

interface Logo3DProps {
  scale?: number
  className?: string
}

const Logo3D: React.FC<Logo3DProps> = ({
  scale = 1,
  className = "h-32 w-32"
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <motion.div 
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 300)
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#047857" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#10b981" />
        
        {/* Logo elements */}
        <group scale={[scale, scale, scale]}>
          <BackdropSphere isHovered={isHovered} />
          
          {/* "MINT" letters */}
          <Letter3D position={[-1.5, 0.3, 0]} text="M" isHovered={isHovered} />
          <Letter3D position={[-0.5, 0.3, 0]} text="I" isHovered={isHovered} />
          <Letter3D position={[0.2, 0.3, 0]} text="N" isHovered={isHovered} />
          <Letter3D position={[1.2, 0.3, 0]} text="T" isHovered={isHovered} />
          
          {/* "LEASE" letters */}
          <Letter3D position={[-1.2, -0.5, 0]} text="L" color="#10b981" isHovered={isHovered} />
          <Letter3D position={[-0.3, -0.5, 0]} text="E" color="#10b981" isHovered={isHovered} />
          <Letter3D position={[0.4, -0.5, 0]} text="A" color="#10b981" isHovered={isHovered} />
          <Letter3D position={[1.1, -0.5, 0]} text="S" color="#10b981" isHovered={isHovered} />
          <Letter3D position={[1.8, -0.5, 0]} text="E" color="#10b981" isHovered={isHovered} />
          
          <LogoParticles />
        </group>
      </Canvas>
      
      {/* Interaction indicators */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary-emerald/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.1 : 0.8, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Click effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary-emerald"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  )
}

export default Logo3D 