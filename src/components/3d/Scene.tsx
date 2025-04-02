/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Scene controller to manage camera and animations
function SceneController() {
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(({ clock }) => {
    // Gentle camera movement influenced by mouse position
    const t = clock.getElapsedTime();
    const baseX = Math.sin(t * 0.1) * 1.5;
    const baseY = 1 + Math.sin(t * 0.05) * 0.3;
    
    // Add mouse influence (reduced effect for subtlety)
    camera.position.x = baseX + mousePosition.current.x * 0.5;
    camera.position.y = baseY + mousePosition.current.y * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Interactive object that follows cursor
function CursorFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef(new THREE.Vector3(0, 0, -3));
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      
      // Project mouse position to 3D space
      const vector = new THREE.Vector3(
        mousePosition.current.x, 
        mousePosition.current.y, 
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      targetPosition.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Smooth follow with easing
    meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * 0.1;
    meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * 0.1;
    meshRef.current.position.z = -3; // Keep at fixed distance from camera
    
    // Add some rotation based on movement
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#00aaff" emissive="#003366" wireframe />
    </mesh>
  );
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
  
  // Define a color palette for more vibrant particles
  const colorPalette = [
    [1.0, 0.3, 0.3], // Red
    [0.3, 1.0, 0.3], // Green
    [0.3, 0.3, 1.0], // Blue
    [1.0, 1.0, 0.3], // Yellow
    [1.0, 0.3, 1.0], // Magenta
    [0.3, 1.0, 1.0], // Cyan
    [1.0, 0.6, 0.1]  // Orange
  ];
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (random(i) - 0.5) * 15;
    positions[i3 + 1] = (random(i + count) - 0.5) * 15;
    positions[i3 + 2] = (random(i + count * 2) - 0.5) * 15;
    
    // Select a color from the palette based on particle index
    const colorIndex = Math.floor(random(i) * colorPalette.length);
    const selectedColor = colorPalette[colorIndex];
    
    // Add some variation to each color
    colors[i3] = selectedColor[0] * (0.7 + random(i) * 0.3);
    colors[i3 + 1] = selectedColor[1] * (0.7 + random(i + 1) * 0.3);
    colors[i3 + 2] = selectedColor[2] * (0.7 + random(i + 2) * 0.3);
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    
    // Animate particles with deterministic movement
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = state.clock.getElapsedTime();
      
      // Use deterministic sine wave based on particle index
      positions[i3 + 1] += Math.sin(t * 0.2 + i * 0.1) * 0.001;
      
      // Animate colors for a pulsating effect
      const pulseSpeed = 0.5;
      const pulseAmount = 0.2;
      const pulse = Math.sin(t * pulseSpeed + i * 0.05) * pulseAmount + 1.0;
      
      // Apply pulse to colors (within original color range)
      const colorIndex = Math.floor(random(i) * colorPalette.length);
      const baseColor = colorPalette[colorIndex];
      
      colors[i3] = baseColor[0] * (0.7 + random(i) * 0.3) * pulse;
      colors[i3 + 1] = baseColor[1] * (0.7 + random(i + 1) * 0.3) * pulse;
      colors[i3 + 2] = baseColor[2] * (0.7 + random(i + 2) * 0.3) * pulse;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
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
        style={{ position: 'absolute', pointerEvents: 'auto' }}
        frameloop="always"
      >
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={60} />
        <SceneController />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <CodeParticles />
        <Laptop />
        <AiBrain />
        <CursorFollower />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}