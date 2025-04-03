/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/lib/ThemeContext';

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
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial 
        color="#19A7CE" 
        emissive="#19A7CE" 
        emissiveIntensity={2}
        wireframe 
      />
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
  const sizes = new Float32Array(count);
  
  // Use a seeded approach for consistent particles
  const seed = 12345; // Fixed seed for deterministic generation
  const random = (n: number) => {
    const x = Math.sin(n + seed) * 10000;
    return x - Math.floor(x);
  };
  
  // Define a color palette for more vibrant particles
  const colorPalette = [
    [1.0, 0.8, 0.8], // Brighter Red
    [0.8, 1.0, 0.8], // Brighter Green
    [0.8, 0.8, 1.0], // Brighter Blue
    [1.0, 1.0, 0.8], // Brighter Yellow
    [1.0, 0.8, 1.0], // Brighter Magenta
    [0.8, 1.0, 1.0], // Brighter Cyan
    [1.0, 0.9, 0.4]  // Brighter Orange
  ];
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (random(i) - 0.5) * 15;
    positions[i3 + 1] = (random(i + count) - 0.5) * 15;
    positions[i3 + 2] = (random(i + count * 2) - 0.5) * 15;
    
    // Select a color from the palette based on particle index
    const colorIndex = Math.floor(random(i) * colorPalette.length);
    const selectedColor = colorPalette[colorIndex];
    
    // Add some variation to each color but keep them bright
    colors[i3] = selectedColor[0] * (0.8 + random(i) * 0.2);
    colors[i3 + 1] = selectedColor[1] * (0.8 + random(i + 1) * 0.2);
    colors[i3 + 2] = selectedColor[2] * (0.8 + random(i + 2) * 0.2);
    
    // Vary the particle sizes for better visibility
    sizes[i] = (random(i) * 0.5 + 0.5) * 3; // Larger particles (0.5 to 3 size)
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3} args={[positions, 3]}        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3} args={[colors, 3]}        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1} args={[sizes, 1]}        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={1}
        depthWrite={false}
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
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.55, -0.4]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Screen display */}
      <mesh position={[0, 0.55, -0.37]} rotation={[Math.PI / 6, 0, 0]}>
        <planeGeometry args={[1.3, 0.7]} />
        <meshBasicMaterial color="#19A7CE" />
      </mesh>
      
      {/* Add keyboard glow */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshBasicMaterial color="#19A7CE" opacity={0.3} transparent={true} />
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
        <meshStandardMaterial 
          color="#FDBE34" 
          emissive="#FDBE34" 
          emissiveIntensity={1.2} 
          wireframe 
        />
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
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial 
              color="#19A7CE" 
              emissive="#19A7CE" 
              emissiveIntensity={1.5} 
            />
          </mesh>
        );
      })}
      
      {/* Add connecting lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const startAngle = (i / 15) * Math.PI * 2;
        const endAngle = ((i + 5) / 15) * Math.PI * 2;
        
        const startRadius = 0.8;
        const startX = Math.sin(startAngle) * startRadius;
        const startY = Math.cos(startAngle) * startRadius;
        const startZ = Math.sin(startAngle * 2) * startRadius * 0.5;
        
        const endRadius = 0.8;
        const endX = Math.sin(endAngle) * endRadius;
        const endY = Math.cos(endAngle) * endRadius;
        const endZ = Math.sin(endAngle * 2) * endRadius * 0.5;
        
        // Create a line geometry
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(startX, startY, startZ));
        points.push(new THREE.Vector3(endX, endY, endZ));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive 
            key={`line-${i}`} 
            object={new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ 
                color: "#19A7CE", 
                linewidth: 3,
                transparent: true,
                opacity: 0.8
              })
            )} 
          />
        );
      })}
      
      {/* Add glowing effect for better visibility */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.8} 
        distance={1.5} 
        color="#FDBE34" 
      />
    </group>
  );
}

// Export a single component with a consistent name
export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
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
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#000000] to-[#000000]/80' 
          : 'bg-gradient-to-b from-[#F2F7FF] to-[#F2F7FF]/80'
      }`}></div>
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
        
        <ambientLight intensity={1.2} /> {/* Further increased ambient light */}
        <directionalLight position={[10, 10, 5]} intensity={2} /> {/* Further increased directional light */}
        <spotLight position={[0, 5, 0]} intensity={1.5} angle={0.5} penumbra={1} /> {/* Increased spot light */}
        <pointLight position={[-2, 0, -1]} intensity={1} distance={6} color="#19A7CE" /> {/* Added point light for laptop */}
        <pointLight position={[2, 0.5, -1]} intensity={1} distance={6} color="#FDBE34" /> {/* Added point light for brain */}
        
        <CodeParticles />
        <Laptop />
        <AiBrain />
        <CursorFollower />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}