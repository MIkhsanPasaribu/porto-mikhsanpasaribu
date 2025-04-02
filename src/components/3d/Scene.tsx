/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Scene controller to manage camera and animations
function SceneController() {
  const { camera } = useThree();
  
  useFrame(({ clock }) => {
    // Gentle camera movement
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 2;
    camera.position.y = 1 + Math.sin(t * 0.05) * 0.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Floating code particles component
function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500; // Reduced count for better performance
  
  // Create particles with deterministic positions using a seeded approach
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  // Use a seeded approach for consistent particles
  const seed = 12345; // Fixed seed for deterministic generation
  const random = (n: number) => {
    const x = Math.sin(n + seed) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (random(i) - 0.5) * 15;
    positions[i3 + 1] = (random(i + count) - 0.5) * 15;
    positions[i3 + 2] = (random(i + count * 2) - 0.5) * 15;
    
    colors[i3] = 0.3 + random(i) * 0.7;
    colors[i3 + 1] = 0.3 + random(i + 1) * 0.7;
    colors[i3 + 2] = 0.8 + random(i + 2) * 0.2;
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    
    // Animate particles with deterministic movement
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = state.clock.getElapsedTime();
      // Use deterministic sine wave based on particle index
      positions[i3 + 1] += Math.sin(t * 0.2 + i * 0.1) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute 
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Laptop() {
  const laptopRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!laptopRef.current) return;
    
    const t = state.clock.getElapsedTime();
    laptopRef.current.rotation.y = Math.sin(t * 0.3) * 0.2 + Math.PI * 0.25;
    laptopRef.current.position.y = Math.sin(t * 0.5) * 0.1 - 0.5;
    laptopRef.current.position.x = -2;
    laptopRef.current.position.z = -1;
  });
  
  return (
    <group ref={laptopRef}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.55, -0.4]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Screen display */}
      <mesh position={[0, 0.55, -0.37]} rotation={[Math.PI / 6, 0, 0]}>
        <planeGeometry args={[1.3, 0.7]} />
        <meshBasicMaterial color="#0a84ff" />
      </mesh>
    </group>
  );
}

function AiBrain() {
  const brainRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!brainRef.current) return;
    
    const t = state.clock.getElapsedTime();
    brainRef.current.rotation.y = t * 0.2;
    brainRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    brainRef.current.position.x = 2;
    brainRef.current.position.y = 0.5;
    brainRef.current.position.z = -1;
  });
  
  return (
    <group ref={brainRef}>
      {/* Brain core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff4500" wireframe />
      </mesh>
      
      {/* Neural connections - using deterministic positions */}
      {Array.from({ length: 20 }).map((_, i) => {
        // Use deterministic positions based on index
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;
        const z = Math.sin(angle * 2) * radius * 0.5;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#00aaff" />
          </mesh>
        );
      })}
    </group>
  );
}

// Export a single component with a consistent name
export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Cleanup function to help with component unmounting
    return () => {
      // Dispose of any Three.js resources if needed
    };
  }, []);
  
  if (!mounted) {
    return null; // Return null on server-side
  }
  
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ position: 'absolute' }}
        frameloop="always"
      >
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={60} />
        <SceneController />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <CodeParticles />
        <Laptop />
        <AiBrain />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}