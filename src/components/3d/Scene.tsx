/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating code particles component
function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;
  
  // Create particles
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    colors[i3] = Math.random();
    colors[i3 + 1] = Math.random();
    colors[i3 + 2] = Math.random();
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    
    // Animate particles
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() + i) * 0.002;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3} args={[positions, 3]}        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3} args={[colors, 3]}        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
}

// Floating laptop model
function Laptop(props: any) {
  const laptopRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!laptopRef.current) return;
    
    laptopRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    laptopRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + 0.1;
  });
  
  // Simple laptop mesh
  return (
    <group ref={laptopRef} {...props}>
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

// AI Brain visualization
function AiBrain(props: any) {
  const brainRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!brainRef.current) return;
    
    brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    brainRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });
  
  return (
    <group ref={brainRef} {...props}>
      {/* Brain core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff4500" wireframe />
      </mesh>
      
      {/* Neural connections */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i) * 0.8,
          Math.cos(i) * 0.8,
          Math.sin(i + 2) * 0.8
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#00aaff" />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <CodeParticles />
        <Laptop position={[-1.5, 0, 0]} />
        <AiBrain position={[1.5, 0.5, 0]} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}