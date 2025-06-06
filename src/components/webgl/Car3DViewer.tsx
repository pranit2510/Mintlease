'use client'

import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PresentationControls, Html, useProgress, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Loading component for 3D models
const Loader = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <motion.div 
        className="flex flex-col items-center gap-4 p-8 rounded-xl bg-black/20 backdrop-blur-md border border-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-2 border-primary-emerald/20"></div>
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-primary-emerald border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading 3D Model</p>
          <p className="text-white/70 text-sm">{Math.round(progress)}%</p>
        </div>
      </motion.div>
    </Html>
  )
}

// Animated floating spheres for luxury ambiance
const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[3, 2, -2]} visible={false}>
        <MeshDistortMaterial
          color="#047857"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </Sphere>
    </Float>
  )
}

// Main 3D car placeholder (replace with actual GLB model)
const CarModel = ({ modelPath, color = "#047857" }: { modelPath?: string; color?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _modelPath = modelPath // Keep for future GLB model loading
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle breathing animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  // Placeholder geometry (replace with useGLTF when you have car models)
  return (
    <group>
      <mesh ref={meshRef} position={[0, -0.5, 0]} scale={[2, 1, 4]}>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Wheels */}
      {[-0.8, 0.8].map((x, i) =>
        [-1.2, 1.2].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -0.8, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      )}
    </group>
  )
}

// Premium lighting setup
const PremiumLighting = () => {
  return (
    <>
      {/* Main lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Accent lighting */}
      <pointLight position={[-10, 0, -20]} color="#047857" intensity={0.5} />
      <pointLight position={[10, 0, 20]} color="#10b981" intensity={0.3} />
      
      {/* Environment lighting */}
      <Environment preset="studio" />
    </>
  )
}

interface Car3DViewerProps {
  modelPath?: string
  autoRotate?: boolean
  enableZoom?: boolean
  carColor?: string
  className?: string
}

const Car3DViewer: React.FC<Car3DViewerProps> = ({
  modelPath = "/models/luxury-car.glb",
  autoRotate = true,
  enableZoom = true,
  carColor = "#047857",
  className = "h-[60vh] w-full"
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <PremiumLighting />
          
          {/* Car Model */}
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <CarModel modelPath={modelPath} color={carColor} />
          </PresentationControls>
          
          {/* Interactive Controls */}
          <OrbitControls
            autoRotate={autoRotate && !isHovered}
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={enableZoom}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={10}
          />
          
          {/* Contact Shadows */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          
          {/* Floating Elements */}
          <FloatingGeometry />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
          <p className="text-white/80 text-sm">Interactive 3D Model</p>
          <p className="text-white text-xs">Drag to rotate • Scroll to zoom</p>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            className="bg-primary-emerald/20 backdrop-blur-md rounded-lg p-2 border border-primary-emerald/30 text-primary-emerald hover:bg-primary-emerald/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}

export default Car3DViewer 